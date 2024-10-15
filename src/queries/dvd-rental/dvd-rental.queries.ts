/** Types generated for queries found in "src/queries/dvd-rental/dvd-rental.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** Query 'GetListActors' is invalid, so its result is assigned type 'never'.
 *  */
export type IGetListActorsResult = never;

/** Query 'GetListActors' is invalid, so its parameters are assigned type 'never'.
 *  */
export type IGetListActorsParams = never;

const getListActorsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM  public.\"actor\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM  public."actor"
 * ```
 */
export const getListActors = new PreparedQuery<IGetListActorsParams,IGetListActorsResult>(getListActorsIR);


