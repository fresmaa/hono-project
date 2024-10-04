import { OpenAPIHono } from "@hono/zod-openapi";

import { showRoutes } from "hono/dev";
import users from "./users";

const app = new OpenAPIHono();

app.use("/", async (c) => {
  return c.json("Hello World!");
});

app.route("/", users);

export default app;
