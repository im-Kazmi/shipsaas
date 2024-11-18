import {
  getProduct,
  listPrices,
  listProducts,
  type Variant,
} from "@lemonsqueezy/lemonsqueezy.js";

import { configureLemonSqueezy } from "~/lib/lemon/lemon-squeezy";
import { supabaseAdmin } from "~/lib/supabase/admin";

interface NewPlan {
  id?: number;
  product_id: number;
  product_name: string;
  variant_id: number;
  name: string;
  description: string | null;
  price: string;
  is_usage_based: boolean;
  interval: string | null;
  interval_count: number | null;
  trial_interval: string | null;
  trial_interval_count: number | null;
  sort: number | null;
}

export async function syncPlans() {
  configureLemonSqueezy();

  const supabase = supabaseAdmin;

  // Fetch all the variants from the database.
  const { data: productVariants, error } = await supabase
    .from("plans")
    .select("*");

  if (error) {
    console.error("Error fetching plans:", error);
    return [];
  }

  console.log("productVariants = ", productVariants);

  // Helper function to add a variant to the productVariants array and sync it with the database.
  async function _addVariant(variant: NewPlan) {
    console.log(`Syncing variant ${variant.name} with the database...`);

    // Sync the variant with the plan in the database.
    const { data, error } = await supabase
      .from("plans")
      .upsert(variant, { onConflict: "variant_id" })
      .select();

    if (error) {
      console.error(`Error syncing ${variant.name}:`, error);
    } else {
      console.log(`${variant.name} synced with the database...`);
      productVariants?.push(data[0]);
    }
  }

  // Fetch products from the Lemon Squeezy store.
  const products = await listProducts({
    filter: { storeId: process.env.LEMON_SQUEEZY_STORE_ID },
    include: ["variants"],
  });

  // Loop through all the variants.
  const allVariants = products.data?.included as Variant["data"][] | undefined;

  // for...of supports asynchronous operations, unlike forEach.
  if (allVariants) {
    for (const v of allVariants) {
      const variant = v.attributes;

      // Skip draft variants or if there's more than one variant, skip the default
      // variant. See https://docs.lemonsqueezy.com/api/variants
      if (
        variant.status === "draft" ||
        (allVariants.length !== 1 && variant.status === "pending")
      ) {
        continue;
      }

      const productName =
        (await getProduct(variant.product_id)).data?.data.attributes.name ?? "";

      const variantPriceObject = await listPrices({
        filter: {
          variantId: v.id,
        },
      });

      const currentPriceObj = variantPriceObject.data?.data.at(0);
      const isUsageBased =
        currentPriceObj?.attributes.usage_aggregation !== null;
      const interval = currentPriceObj?.attributes.renewal_interval_unit;
      const intervalCount =
        currentPriceObj?.attributes.renewal_interval_quantity;
      const trialInterval = currentPriceObj?.attributes.trial_interval_unit;
      const trialIntervalCount =
        currentPriceObj?.attributes.trial_interval_quantity;

      const price = isUsageBased
        ? currentPriceObj?.attributes.unit_price_decimal
        : currentPriceObj.attributes.unit_price;

      const priceString = price !== null ? (price?.toString() ?? "") : "";

      const isSubscription =
        currentPriceObj?.attributes.category === "subscription";

      // If not a subscription, skip it.
      if (!isSubscription) {
        continue;
      }

      await _addVariant({
        name: variant.name,
        description: variant.description,
        price: priceString,
        interval,
        interval_count: intervalCount,
        is_usage_based: isUsageBased,
        product_id: variant.product_id,
        product_name: productName,
        variant_id: parseInt(v.id),
        trial_interval: trialInterval,
        trial_interval_count: trialIntervalCount,
        sort: variant.sort,
      });
    }
  }

  return productVariants;
}

syncPlans()
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit();
  });
