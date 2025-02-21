import apm = require("elastic-apm-node");
import connectClient from "../config/client";
import { getListActors } from "../queries/dvd-rental/dvd-rental.queries";

export const getListActor = async () => {
  let result;
  let clientSpan = null;
  let querySpan = null;

  try {
    clientSpan = apm.startSpan("Connect to DB", "server");
    clientSpan?.addLabels({
      data_source: "internal",
      source_name: "list-actors",
    });
    const client = await connectClient();
    if (clientSpan) clientSpan.end();

    querySpan = apm.startSpan("Fetch Actor", "server");
    querySpan?.addLabels({
      data_source: "internal",
      source_name: "list-actors",
    });

    result = await getListActors.run(undefined, client);

    if (querySpan) querySpan.end();
  } catch (error: any) {
    throw new Error("Failed to fetch actor data");
  } finally {
    clientSpan?.end();
    querySpan?.end();
  }

  return result;
};