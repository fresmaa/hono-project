import apm from "elastic-apm-node";
import env from "./config";

export default apm.start({
  active:
    env.ELASTIC_APM_ENABLE &&
    env.ELASTIC_APM_SERVER_URL !== null &&
    env.ELASTIC_APM_SECRET_TOKEN !== null,
  serviceName: `${env.ELASTIC_APM_SERVICE_NAME}`,
  apiKey: `${env.ELASTIC_APM_API_KEY}`,
  serverUrl: `${env.ELASTIC_APM_SERVER_URL}`,
  environment: `${env.ELASTIC_APM_ENVIRONMENT}`,
});
