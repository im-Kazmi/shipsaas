import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

import checkout from "./checkout";
import posts from "./posts";
import products from "./products";
import subscriptions from "./subscriptions";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app
  .route("/posts", posts)
  .route("/checkout", checkout)
  .route("/products", products)
  .route("/subscriptions", subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);

export type AppType = typeof routes;
