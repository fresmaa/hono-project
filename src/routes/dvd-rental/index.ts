import { OpenAPIHono } from "@hono/zod-openapi";
import { BindVarType } from "../../lib/type/bindvar.type";
import listActor from "./list-actor/index";

const app = new OpenAPIHono<BindVarType>();

app.route("/", listActor);

export default app;
