import { Context } from "hono";
import { DbInstance } from "./dbInstance";

export const connectClient = async (c: Context) => {
  let client = c.var.dbClient;
  if (!client) {
    client = await (await DbInstance.getInstance()).getClient();
    c.set("dbClient", client);
  }
  return client;
};

export default async () => {
  const client = await (await DbInstance.getInstance()).getClient();
  return client;
};
