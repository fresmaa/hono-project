import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { defaultResponseSchema, errorSchema } from "./index.schema";
import usersHandler from "./index.handler";

const app = new OpenAPIHono();

app.openapi(
  createRoute<any, any>({
    tags: ["User API"],
    path: "/users",
    method: "get",
    security: [
      {
        Authorization: [],
        AuthManualBearer: [],
      },
    ],
    //   request: {
    //     params: nipParamSchema,
    //   },
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
  usersHandler
);

export default app;
