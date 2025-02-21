import { Context, Next } from "hono";
import loggerWinston from "../lib/logger";

export default async (c: Context, next: Next) => {
  try {
    await next();
    if (c.res.status === 201 || c.res.status === 200) {
      loggerWinston.info(`${c.req.method} ${c.req.url}`, {
        req: c.req.raw,
        res: c.res,
      });
    } else if (c.res.status >= 500) {
      const res = c.res.clone();
      try {
        const response = await res.json();
        loggerWinston.error(`${c.req.method} ${c.req.url}`, {
          err: { status: c.res.status, response: response },
          req: c.req.raw,
          res: c.res,
        });
      } catch (error) {}
    } else {
      loggerWinston.warn(`${c.req.method} ${c.req.url}`, {
        req: c.req.raw,
        res: c.res,
      });
    }
  } catch (error) {
    loggerWinston.error(`${c.req.method} ${c.req.url}`, {
      err: error,
      req: c.req.raw,
      res: c.res,
    });
    throw error;
  }
};
