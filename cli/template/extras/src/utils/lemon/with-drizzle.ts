import {
  createCustomer,
  getCustomer,
  listCustomers,
} from "@lemonsqueezy/lemonsqueezy.js";
import { eq } from "drizzle-orm";

import { configureLemonSqueezy } from "~/lib/lemon/lemon-squeezy";
import { db } from "~/server/db";
import { customers } from "~/server/db/schema";

const upsertCustomerToDb = async (uuid: string, customerId: string) => {
  try {
    await db
      .insert(customers)
      .values({ id: uuid, lemonSqueezyCustomerId: customerId })
      .onConflictDoUpdate({
        target: customers.id,
        set: { lemonSqueezyCustomerId: customerId },
      });
    return customerId;
  } catch (error) {
    throw new Error(
      `Drizzle ORM customer record creation failed: ${error.message}`
    );
  }
};

const createCustomerInLemon = async (uuid: string, email: string) => {
  configureLemonSqueezy();
  const customerData = { email: email, name: email };
  const newCustomer = await createCustomer(
    process.env.LEMON_SQUEEZY_STORE_ID!,
    customerData
  );

  if (!newCustomer) throw new Error("LemonSqueezy customer creation failed.");

  return newCustomer.data?.data.id;
};

const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  const [existingCustomer] = await db
    .select()
    .from(customers)
    .where(eq(customers.id, uuid));

  if (!existingCustomer) {
    console.warn(
      `Drizzle ORM customer record was missing. Creating a new record.`
    );
  }

  // Retrieve the Lemon customer ID using the Drizzle customer ID, with email fallback
  let lemonSqueezyCustomerId: string | undefined;
  if (existingCustomer?.lemonSqueezyCustomerId) {
    const existingLemonCustomer = await getCustomer(
      existingCustomer.lemonSqueezyCustomerId
    );
    lemonSqueezyCustomerId = existingLemonCustomer.data?.data.id;
  } else {
    // If Lemon ID is missing from Drizzle, try to retrieve Lemon customer ID by email
    const { data: lemonCustomer } = await listCustomers({
      filter: { email: email },
    });
    lemonSqueezyCustomerId =
      lemonCustomer?.data && lemonCustomer?.data.length > 0
        ? lemonCustomer.data[0].id
        : undefined;
  }

  // If still no lemonSqueezyCustomerId, create a new customer in LemonSqueezy
  const lemonIdToInsert = lemonSqueezyCustomerId
    ? lemonSqueezyCustomerId
    : await createCustomerInLemon(uuid, email);
  if (!lemonIdToInsert)
    throw new Error("LemonSqueezy customer creation failed.");

  if (existingCustomer && lemonSqueezyCustomerId) {
    // If Drizzle has a record but doesn't match LemonSqueezy, update Drizzle record
    if (existingCustomer.lemonSqueezyCustomerId !== lemonSqueezyCustomerId) {
      try {
        await db
          .update(customers)
          .set({ lemonSqueezyCustomerId })
          .where(eq(customers.id, uuid));
        console.warn(
          `Drizzle ORM customer record mismatched LemonSqueezy ID. Record updated.`
        );
      } catch (updateError) {
        throw new Error(
          `Drizzle ORM customer record update failed: ${updateError.message}`
        );
      }
    }
    // If Drizzle has a record and matches LemonSqueezy, return LemonSqueezy customer ID
    return lemonSqueezyCustomerId;
  } else {
    // If Drizzle has no record, create a new record and return LemonSqueezy customer ID
    const upsertedLemonCustomer = await upsertCustomerToDb(
      uuid,
      lemonIdToInsert
    );

    if (!upsertedLemonCustomer)
      throw new Error("Drizzle ORM customer record creation failed.");

    return upsertedLemonCustomer;
  }
};

export { createOrRetrieveCustomer };
