import { Context } from "hono";
import { supabase } from "../../../config/connectSupabase";

export default async (c: Context) => {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(10);

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    // Filter the data to get only the required fields
    const filteredData = data.map(
      ({ username, first_name, last_name, email }) => ({
        username,
        first_name,
        last_name,
        email,
      })
    );

    return c.json(
      {
        success: true,
        message: "Success Get Users",
        data: filteredData,
      },
      201
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
