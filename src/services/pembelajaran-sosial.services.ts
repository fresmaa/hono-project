import * as qs from "qs";
import { HTTPException } from "hono/http-exception";
import apm from "elastic-apm-node";
import configEnv from "../lib/config";

const endpointAktivitasForum = "/learning/api/belajar-sosial/aktivitas-forum";

export default {
    getAktivitasForum: async() => {
        const url = configEnv.HOST_PEMBELAJARAN_SOSIAL + endpointAktivitasForum;

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
            if (response.status >= 500) return null;
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            span?.end();
        }
    }
};