import {
  createCustomer,
  getCustomer,
  listCustomers,
} from "@lemonsqueezy/lemonsqueezy.js";

import { configureLemonSqueezy } from "~/lib/lemon/lemon-squeezy";
import { supabaseAdmin } from "~/lib/supabase/admin";

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
  const { error: upsertError } = await supabaseAdmin
    .from("customers")
    .upsert([{ id: uuid, lemon_squeezy_customer_id: customerId }]);

  if (upsertError)
    throw new Error(
      `Supabase customer record creation failed: ${upsertError.message}`
    );

  return customerId;
};

const createCustomerInLemon = async (uuid: string, email: string) => {
  configureLemonSqueezy();
  const customerData = { email: email, name: email };
  const newCustomer = await createCustomer(
    process.env.LEMON_SQUEEZY_STORE_ID!,
    customerData
  );

  if (!newCustomer) throw new Error("lemon customer creation failed.");

  return newCustomer.data?.data.id;
};

const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  // Check if the customer already exists in Supabase
  const { data: existingSupabaseCustomer, error: queryError } =
    await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("id", uuid)
      .maybeSingle();

  if (queryError) {
    throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
  }

  // Retrieve the Lemon customer ID using the Supabase customer ID, with email fallback
  let lemon_squeezy_customer_id: string | undefined;
  if (existingSupabaseCustomer?.lemon_squeezy_customer_id) {
    const existingLemonCustomer = await getCustomer(
      existingSupabaseCustomer.lemon_squeezy_customer_id
    );

    lemon_squeezy_customer_id = existingLemonCustomer.data?.data.id;
  } else {
    // If Lemon ID is missing from Supabase, try to retrieve Lemon customer ID by email
    const { data: lemonCustomer } = await listCustomers({
      filter: { email: email },
    });
    lemon_squeezy_customer_id =
      lemonCustomer?.data && lemonCustomer?.data.length > 0
        ? lemonCustomer.data[0].id
        : undefined;
  }

  // If still no lemon_squeezy_customer_id, create a new customer in LemonSqueezy
  const lemonIdToInsert = lemon_squeezy_customer_id
    ? lemon_squeezy_customer_id
    : await createCustomerInLemon(uuid, email);
  if (!lemonIdToInsert)
    throw new Error("LemonSqueezy customer creation failed.");

  if (existingSupabaseCustomer && lemon_squeezy_customer_id) {
    // If Supabase has a record but doesn't match LemonSqueezy, update Supabase record
    if (
      existingSupabaseCustomer.lemon_squeezy_customer_id !==
      lemon_squeezy_customer_id
    ) {
      const { error: updateError } = await supabaseAdmin
        .from("customers")
        .update({ lemon_squeezy_customer_id })
        .eq("id", uuid);

      if (updateError)
        throw new Error(
          `Supabase customer record update failed: ${updateError.message}`
        );
      console.warn(
        `Supabase customer record mismatched Lemonsqueezy ID. Supabase record updated.`
      );
    }
    // If Supabase has a record and matches LemonSqueezy, return LemonSqueezy customer ID
    return lemon_squeezy_customer_id;
  } else {
    console.warn(
      `Supabase customer record was missing. A new record was created.`
    );

    // If Supabase has no record, create a new record and return LemonSqueezy customer ID
    const upsertedLemonCustomer = await upsertCustomerToSupabase(
      uuid,
      lemonIdToInsert
    );

    if (!upsertedLemonCustomer)
      throw new Error("Supabase customer record creation failed.");

    return upsertedLemonCustomer;
  }
};

export { createOrRetrieveCustomer };
