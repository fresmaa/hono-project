import apm = require('elastic-apm-node');
import connectClient from '../config/client';
import {
    getListActors,  
} from '../queries/dvd-rental/dvd-rental.queries';

export const getListActor = async () => {
    let result;
    let rows;
    let clientSpan = null;
    let querySpan = null;
  
    try {
      clientSpan = apm.startSpan('Connect to DB', 'server');
      clientSpan?.addLabels({
        data_source: 'internal',
        source_name: 'pembelajaran-sosial',
      });
      const client = await connectClient();
      if (clientSpan) clientSpan.end();
  
      querySpan = apm.startSpan('Fetch Category', 'server');
      querySpan?.addLabels({
        data_source: 'internal',
        source_name: 'pembelajaran-sosial',
      });
      result = await getListActors.run(undefined, client);
  
      if (querySpan) querySpan.end();
    } catch (error: any) {
      apm.captureError(error);
      throw error;
    } finally {
      clientSpan?.end();
      querySpan?.end();
    }

    return result;
};