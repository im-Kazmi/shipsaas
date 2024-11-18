import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const pricingTypeEnum = mysqlEnum("pricing_type", [
  "one_time",
  "recurring",
]);
export const pricingPlanIntervalEnum = mysqlEnum("pricing_plan_interval", [
  "day",
  "week",
  "month",
  "year",
]);
export const subscriptionStatusEnum = mysqlEnum("subscription_status", [
  "trialing",
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "unpaid",
  "paused",
]);

export const createTable = mysqlTableCreator((name) => `project1_${name}`);

export const posts = createTable(
  "post",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 256 }),
    content: text("content"),
    createdById: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => user.id),
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
export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
});

export const customers = createTable("customers", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .references(() => user.id),
  stripeCustomerId: text("stripe_customer_id"),
});

// Products table
export const products = createTable("products", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  active: boolean("active"),
  name: text("name"),
  description: text("description"),
  image: text("image"),
  metadata: json("metadata"),
});

export const prices = createTable("prices", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productId: text("product_id").references(() => products.id),
  active: boolean("active"),
  description: text("description"),
  unitAmount: bigint("unit_amount", { mode: "number" }),
  currency: text("currency"),
  type: pricingTypeEnum,
  interval: pricingPlanIntervalEnum,
  intervalCount: int("interval_count"),
  trialPeriodDays: int("trial_period_days"),
  metadata: json("metadata"),
});

export const subscriptions = createTable("subscriptions", {
  id: text("id").primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id),
  status: subscriptionStatusEnum,
  metadata: json("metadata"),
  priceId: text("price_id").references(() => prices.id),
  quantity: int("quantity"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end"),
  created: timestamp("created").defaultNow().notNull(),
  currentPeriodStart: timestamp("current_period_start").defaultNow().notNull(),
  currentPeriodEnd: timestamp("current_period_end").defaultNow().notNull(),
  endedAt: timestamp("ended_at").defaultNow(),
  cancelAt: timestamp("cancel_at").defaultNow(),
  canceledAt: timestamp("canceled_at").defaultNow(),
  trialStart: timestamp("trial_start").defaultNow(),
  trialEnd: timestamp("trial_end").defaultNow(),
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
