import { Hono } from 'hono'
import { createClient } from '@supabase/supabase-js';
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { basicAuth } from 'hono/basic-auth'
import { routes } from "./routes";

const app = new OpenAPIHono();

app.use(
  "/doc",
  basicAuth({
    username: process.env.SWAGGER_USERNAME ?? "admin",
    password: process.env.SWAGGER_PASSWORD ?? "password",
  }),
);

app.get(
  "/swagger",
  basicAuth({
    username: process.env.SWAGGER_USERNAME ?? "admin",
    password: process.env.SWAGGER_PASSWORD ?? "password",
  }),
  swaggerUI({ url: "/doc" }),
);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
  security: [
    {
      ApiKey: [],
    },
  ],
});

routes(app);

export default app
