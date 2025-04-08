import apm = require("elastic-apm-node");
import connectClient from "../config/client";
import { getListActors, countTotalActor } from "../queries/dvd-rental/dvd-rental.queries";

/**
 * Get list of actors
 * 
 * This function will execute a query to the database to get list of actor
 * 
 * @returns {Promise<IGetListActorsResult[]>} Promise that resolves with the list of actor
 */

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

/**
 * Get total count of actor
 * 
 * This function will execute a query to the database to get total count of actor
 * 
 * @returns {Promise<number>} Promise that resolves with the total count of actor
 */
export const getTotalActor = async () => {
  let result;
  let clientSpan = null;
  let querySpan = null;

  try {
    clientSpan = apm.startSpan("Connect to DB", "server");
    clientSpan?.addLabels({
      data_source: "internal",
      source_name: "count-total-actor",
    });
    const client = await connectClient();
    if (clientSpan) clientSpan.end();

    querySpan = apm.startSpan("Fetch Total Actor", "server");
    querySpan?.addLabels({
      data_source: "internal",
      source_name: "count-total-actor",
    });

    result = await countTotalActor.run(undefined, client);

    if (querySpan) querySpan.end();
  } catch (error) {
    throw new Error("Failed to fetch total actor count");
  } finally {
    clientSpan?.end();
    querySpan?.end();
  }

  return result;
};
