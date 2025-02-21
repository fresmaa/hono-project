import apm from "elastic-apm-node";
import { Context, Next } from "hono";

export default async (c: Context, next: Next) => {
  let trans = null;
  try {
    //start trace
    trans = apm
      ? apm.startTransaction(`${c.req.method} ${c.req.path}`, "server")
      : null;

    await next();

    //add user context
    const session = c.get("session");
    if (session && session.get("id")) {
      const user = {
        id: session.get("id"),
        name: session.get("name"),
        email: session.get("email"),
      };
      apm.setUserContext(user);
    }

    // if not ok then add response to context trace
    const res = c.res.clone();
    if (res.status !== 201 && res.status !== 200) {
      try {
        const response = await res.json();
        apm.setCustomContext({ response: response });
      } catch (error) {}
    }
  } catch (error) {
    // apm.captureError(error as Error);
    throw error;
  } finally {
    if (trans) trans.end();
  }
};
