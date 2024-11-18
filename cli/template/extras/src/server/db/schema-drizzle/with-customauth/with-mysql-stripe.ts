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

export const accountTypeEnum = mysqlEnum("type", ["email", "google", "github"]);
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
      .references(() => users.id),
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
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
});

export const accounts = createTable(
  "accounts",
  {
    id: serial("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountType: accountTypeEnum.default("email").notNull(),
    githubId: text("githubId").unique(),
    googleId: text("googleId").unique(),
    password: text("password"),
    salt: text("salt"),
  },
  (table) => ({
    userIdAccountTypeIdx: index("user_id_account_type_idx").on(
      table.userId,
      table.accountType
    ),
  })
);

export const magicLinks = createTable(
  "magic_links",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    token: text("token"),
    tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
  },
  (table) => ({
    tokenIdx: index("magic_links_token_idx").on(table.token),
  })
);

export const resetTokens = createTable(
  "reset_tokens",
  {
    id: serial("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(),
    token: text("token"),
    tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
  },
  (table) => ({
    tokenIdx: index("reset_tokens_token_idx").on(table.token),
  })
);

export const verifyEmailTokens = createTable(
  "verify_email_tokens",
  {
    id: serial("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(),
    token: text("token"),
    tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
  },
  (table) => ({
    tokenIdx: index("verify_email_tokens_token_idx").on(table.token),
  })
);

export const profiles = createTable("profile", {
  id: serial("id").primaryKey(),
  userId: serial("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  displayName: text("displayName"),
  imageId: text("imageId"),
  image: text("image"),
  bio: text("bio").notNull().default(""),
});

export const sessions = createTable(
  "session",
  {
    id: text("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", {
      mode: "date",
    }).notNull(),
  },
  (table) => ({
    userIdIdx: index("sessions_user_id_idx").on(table.userId),
  })
);
export const customers = createTable("customers", {
  id: text("id")
    .primaryKey()
    .notNull()
    .references(() => users.id),
  stripeCustomerId: text("stripe_customer_id"),
});

// Products table
export const products = createTable("products", {
  id: text("id").primaryKey(),
  active: boolean("active"),
  name: text("name"),
  description: text("description"),
  image: text("image"),
  metadata: json("metadata"),
});

// Prices table
export const prices = createTable("prices", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id),
  active: boolean("active"),
  description: text("description"),
  unitAmount: int("unit_amount"),
  currency: text("currency"),
  type: pricingTypeEnum,
  interval: pricingPlanIntervalEnum,
  intervalCount: int("interval_count"),
  trialPeriodDays: int("trial_period_days"),
  metadata: json("metadata"),
});

// Subscriptions table
export const subscriptions = createTable("subscriptions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
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
