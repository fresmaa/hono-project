import { OpenAPIHono } from "@hono/zod-openapi";

import { showRoutes } from "hono/dev";
import admin from "./admin";

export const routes = (app: OpenAPIHono) => {
  app.get("/", (c) => {
    return c.json("Hello World Testing!");
  });

  app.route("/admin", admin);
};
