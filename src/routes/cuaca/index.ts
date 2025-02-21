import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
  defaultResponseSchema,
  errorSchema,
  weatherSchema,
} from "./index.schema";
import weatherHandler from "./index.handler";

const app = new OpenAPIHono();

app.openapi(
  createRoute<any, any>({
    tags: ["User API"],
    path: "/{city?}",
    method: "get",
    security: [
      {
        Authorization: [],
        AuthManualBearer: [],
      },
    ],
    // request: {
    //   params: weatherSchema,
    // },
    responses: {
      201: {
        content: {
          "application/json": {
            schema: defaultResponseSchema,
          },
        },
        description: "Get Data Users",
      },
      500: {
        content: {
          "application/json": {
            schema: errorSchema,
          },
        },
        description: "Server Error",
      },
      401: {
        content: {
          "application/json": {
            schema: errorSchema,
          },
        },
        description: "Unauthorized",
      },
    },
  }),
  weatherHandler
);

export default app;
