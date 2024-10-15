import { Context } from "hono";
import {
  getListActor
} from '../../../repositories/dvd-rental.repositories';

export default async (c: Context) => {
    try {

      const forumPopular = await getListActor();

      return c.json(
        {
          success: true,
          message: 'Get data is success',
          data: {
            rows: forumPopular,
          },
        },
        200,
      );
    } catch (error: any) {
        return c.json({
            success: false,
            message: error.message,
            error: error.message,
        }, 500);
    }
};
