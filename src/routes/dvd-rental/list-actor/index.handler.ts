import { Context } from "hono";
import { getListActor } from "../../../repositories/dvd-rental.repositories";
import { z } from 'zod';

export default async (c: Context) => {
  try {
    const current_page = parseInt(c.req.query("page") || "1", 10);
    const page_size = parseInt(c.req.query("size") || "10", 10);
    const search = c.req.query("search") || null;

    const forum_popular = await getListActor();

    return c.json(
      {
        success: true,
        message: "Get data is success",
        data: {
          rows: forum_popular,
        },
      },
      200
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Menangani ZodError dan hanya mengambil pesan yang relevan dari error
      const errorMessages = error.errors.map((e) => e.message).join(', ');  // Ambil pesan saja
      return c.json({ success: false, error: errorMessages }, 400);  // Response dengan status 400 dan pesan error
    }

    throw new Error(error.message);
  }
};
