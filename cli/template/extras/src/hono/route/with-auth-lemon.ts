import { initAuthConfig, type AuthConfig } from "@hono/auth-js";
import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

import { authConfig } from "~/auth-config";
import auth from "./auth";
import checkout from "./checkout";
import plans from "./plans";
import posts from "./posts";
import subscriptions from "./subscriptions";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

function getAuthConfig(c: Context): AuthConfig {
  return {
    ...authConfig,
  };
}

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/auth", auth)
  .route("/posts", posts)
  .route("/checkout", checkout)
  .route("/plans", plans)
  .route("/subscriptions", subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);

export type AppType = typeof routes;
