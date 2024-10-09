import { Context } from "hono";
import api from '../../services/cuaca.services';

export default async (c: Context) => {
    try {

      const city = c.req.query('city');

      const newData = await api.getWeatherCondition({
        city: city,
      });

      // Check if city is not provided
      if (!city) {
        return c.json(
          {
            success: false,
            message: 'City parameter is required',
            error: 'Please provide a valid city name.',
          },
          400
        );
      }

      if (!newData) {
        return c.json(
          {
            success: false,
            message: 'Request Failed',
            data: newData,
            error: "Server error, please try again later",
          },
          500,
        );
      }

      return c.json(
        {
          success: true,
          message: 'Success Get Weather Condition',
          data: newData,
        },
        201,
      );

    } catch (error: any) {
        return c.json({
            success: false,
            message: error.message,
            error: error.message,
        }, 500);
    }
};
