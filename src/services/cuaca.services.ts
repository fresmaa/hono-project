import apm from "elastic-apm-node";
import configEnv from "../lib/config";
import { ArgsWether } from "../lib/type/weather";

export default {
  getWeatherCondition: async ({ city }: ArgsWether) => {
    const api_key = configEnv.API_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`; // Ganti dengan API key kamu

    const config: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const span = apm?.startSpan("get-weather-data");
    span?.addLabels({ data_source: "external", source_name: "OpenWeatherMap" });

    try {
      const response = await fetch(url, config);

      // Check if response status is 401
      if (response.status === 401) {
        console.log("Error 401: Unauthorized. Check your API key.");
        throw new Error("Unauthorized: Invalid API key or lack of access.");
      }

      // If status code is >= 500, return null (server error)
      if (response.status >= 500) {
        console.log("Server error:", response.status);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      span?.end();
    }
  },
};
