import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { listActorSchema, errorSchema, paramSchema } from "./index.schema";
import listActorHandler from "./index.handler";

const app = new OpenAPIHono();

app.openapi(
    createRoute<any, any>({
      tags: ['DVD Rental'],
      path: '/list-actor',
      method: 'get',
      security: [
        {
          Authorization: [],
          AuthManualBearer: [],
        },
      ],
      request: {
        query: paramSchema,
      },
      responses: {
        201: {
          content: {
            'application/json': {
              schema: listActorSchema,
            },
          },
          description: 'Get Data Users',
        },
        500: {
          content: {
            'application/json': {
              schema: errorSchema,
            },
          },
          description: 'Server Error',
        },
        401: {
          content: {
            'application/json': {
              schema: errorSchema,
            },
          },
          description: 'Unauthorized',
        },
      },
    }),
    listActorHandler
);

export default app;
