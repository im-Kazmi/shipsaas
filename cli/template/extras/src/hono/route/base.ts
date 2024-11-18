import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

import posts from "./posts";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const routes = app.route("/posts", posts);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);

export type AppType = typeof routes;
