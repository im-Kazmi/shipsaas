import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// i did'nt added relation with users because at testing the boilerplate
// you might dont have clerk webhooks setup and users are not saved
// in the db and creating a post with  relation to user will thorw a foriegn key violation error //

// and i dont want any error at testing my boilerplate
// i will recommend creating relations of all the tables with user after you set up the webhook
//

export const pricingTypeEnum = pgEnum("pricing_type", [
  "one_time",
  "recurring",
]);
export const pricingPlanIntervalEnum = pgEnum("pricing_plan_interval", [
  "day",
  "week",
  "month",
  "year",
]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "trialing",
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "unpaid",
  "paused",
]);

export const createTable = pgTableCreator((name) => `asdf_${name}`);

export const posts = createTable(
  "post",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 256 }),
    content: text("content"),
    createdById: text("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  })
);
export const users = createTable("user", {
  clerkId: text("clerk_id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  image: text("image"),
  password: text("password"),
});

export const customers = createTable("customers", {
  id: text("id").primaryKey().notNull(),
  stripeCustomerId: text("stripe_customer_id"),
});

// Products table
export const products = createTable("products", {
  id: text("id").primaryKey(),
  active: boolean("active"),
  name: text("name"),
  description: text("description"),
  image: text("image"),
  metadata: jsonb("metadata"),
});

// Prices table
export const prices = createTable("prices", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id),
  active: boolean("active"),
  description: text("description"),
  unitAmount: integer("unit_amount"),
  currency: text("currency"),
  type: pricingTypeEnum("type"),
  interval: pricingPlanIntervalEnum("interval"),
  intervalCount: integer("interval_count"),
  trialPeriodDays: integer("trial_period_days"),
  metadata: jsonb("metadata"),
});

// Subscriptions table
export const subscriptions = createTable("subscriptions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  status: subscriptionStatusEnum("status"),
  metadata: jsonb("metadata"),
  priceId: text("price_id").references(() => prices.id),
  quantity: integer("quantity"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end"),
  created: timestamp("created", { withTimezone: true }).defaultNow().notNull(),
  currentPeriodStart: timestamp("current_period_start", { withTimezone: true })
    .defaultNow()
    .notNull(),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true })
    .defaultNow()
    .notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }).defaultNow(),
  cancelAt: timestamp("cancel_at", { withTimezone: true }).defaultNow(),
  canceledAt: timestamp("canceled_at", { withTimezone: true }).defaultNow(),
  trialStart: timestamp("trial_start", { withTimezone: true }).defaultNow(),
  trialEnd: timestamp("trial_end", { withTimezone: true }).defaultNow(),
});

export type Price = typeof prices.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type Post = typeof posts.$inferSelect;

export type NewPrice = typeof prices.$inferInsert;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type NewProduct = typeof products.$inferInsert;
export type NewCustomer = typeof customers.$inferInsert;
export type NewPost = typeof posts.$inferInsert;
