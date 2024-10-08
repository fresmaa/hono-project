import { OpenAPIHono } from "@hono/zod-openapi";

import users from "./users";

const app = new OpenAPIHono();

app.use("/", async (c) => {
  return c.json("Hello World!");
});

app.route("/", users);

export default app;
