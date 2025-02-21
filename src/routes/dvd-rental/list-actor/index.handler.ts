import { Context } from "hono";
import { getListActor } from "../../../repositories/dvd-rental.repositories";

export default async (c: Context) => {
  try {
    const currentPage = parseInt(c.req.query("page") || "1", 10);
    const pageSize = parseInt(c.req.query("size") || "10", 10);
    const search = c.req.query("search") || null;

    // const totalDataResult = await getTotalDataActor({
    //   category,
    //   sub_category: subCategory,
    //   title: search,
    // });

    const forumPopular = await getListActor();

    return c.json(
      {
        success: true,
        message: "Get data is success",
        data: {
          rows: forumPopular,
        },
      },
      200
    );
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message,
        error: error.message,
      },
      500
    );
  }
};
