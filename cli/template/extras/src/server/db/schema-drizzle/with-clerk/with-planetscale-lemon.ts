import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  json,
  mysqlTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator((name) => `project1_${name}`);

// i did'nt added relation with users because at testing the boilerplate
// you might dont have clerk webhooks setup and users are not saved
// in the db and creating a post with  relation to user will thorw a foriegn key violation error //

// and i dont want any error at testing my boilerplate
// i will recommend creating relations of all the tables with user after you set up the webhook
//

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
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
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
  billingAddress: json("billing_address"),
  paymentMethod: json("payment_method"),
});

export const customers = createTable("customers", {
  id: text("id").primaryKey().notNull(),
  lemonSqueezyCustomerId: text("lemon_customer_id"),
});

export const plans = createTable("plans", {
  id: serial("id").primaryKey(),
  productId: int("productId").notNull(),
  productName: text("productName"),
  variantId: int("variantId").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  isUsageBased: boolean("isUsageBased").default(false),
  interval: text("interval"),
  intervalCount: int("intervalCount"),
  trialInterval: text("trialInterval"),
  trialIntervalCount: int("trialIntervalCount"),
  sort: int("sort"),
});

export const subscriptions = createTable("subscriptions", {
  id: serial("id").primaryKey(),
  lemonSqueezyId: text("lemonSqueezyId").unique().notNull(),
  orderId: int("orderId").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull(),
  statusFormatted: text("statusFormatted").notNull(),
  renewsAt: text("renewsAt"),
  endsAt: text("endsAt"),
  trialEndsAt: text("trialEndsAt"),
  price: text("price").notNull(),
  isUsageBased: boolean("isUsageBased").default(false),
  isPaused: boolean("isPaused").default(false),
  subscriptionItemId: serial("subscriptionItemId"),
  userId: text("userId").notNull(),
  planId: int("planId")
    .notNull()
    .references(() => plans.id),
});

export const webhookEvents = createTable("webhookEvent", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  eventName: text("eventName").notNull(),
  processed: boolean("processed").default(false),
  body: json("body").notNull(),
  processingError: text("processingError"),
});

export type NewPlan = typeof plans.$inferInsert;
export type GetPlan = typeof plans.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type NewWebhookEvent = typeof webhookEvents.$inferInsert;