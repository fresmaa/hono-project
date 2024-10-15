import { OpenAPIHono } from "@hono/zod-openapi";

import { showRoutes } from "hono/dev";
import admin from "./admin";
import cuaca from "./cuaca";
import dvdRental from "./dvd-rental"

export const routes = (app: OpenAPIHono) => {
  app.get("/", (c) => {
    return c.json("Hello World Testing!");
  });

  app.route("/admin", admin);
  app.route("/cuaca", cuaca);
  app.route("/dvd-rental", dvdRental);
};
