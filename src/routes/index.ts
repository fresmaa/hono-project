import { OpenAPIHono } from "@hono/zod-openapi";

import admin from "./admin";
import cuaca from "./cuaca";
import dvdRental from "./dvd-rental";

export const routes = (app: OpenAPIHono) => {
  app.get("/", (c) => {
    return c.json("Hello World Testing!");
  });

  // Centralized Error Handler Middleware
  app.onError((err, c) => {
    console.error("Error:", err.message);

    return c.json(
      {
        success: false,
        message: "Server error, please try again later",
        error: err.message,
      },
      500
    );
  });

  app.route("/admin", admin);
  app.route("/cuaca", cuaca);
  app.route("/dvd-rental", dvdRental);
};
