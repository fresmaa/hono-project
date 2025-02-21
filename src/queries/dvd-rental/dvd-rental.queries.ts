/** Types generated for queries found in "src/queries/dvd-rental/dvd-rental.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetListActors' parameters type */
export type IGetListActorsParams = void;

/** 'GetListActors' return type */
export interface IGetListActorsResult {
  actor_id: number;
  name: string | null;
  title: string;
}

/** 'GetListActors' query type */
export interface IGetListActorsQuery {
  params: IGetListActorsParams;
  result: IGetListActorsResult;
}

const getListActorsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    actor.actor_id,\n    actor.first_name || ' ' || actor.last_name AS name,\n    film.title\nFROM\n    public.\"actor\" AS actor\nLEFT JOIN\n    public.\"film_actor\" film_actor ON actor.actor_id = film_actor.actor_id\nLEFT JOIN\n    public.\"film\" film ON film_actor.film_id = film.film_id\nORDER BY \n    actor.last_update DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     actor.actor_id,
 *     actor.first_name || ' ' || actor.last_name AS name,
 *     film.title
 * FROM
 *     public."actor" AS actor
 * LEFT JOIN
 *     public."film_actor" film_actor ON actor.actor_id = film_actor.actor_id
 * LEFT JOIN
 *     public."film" film ON film_actor.film_id = film.film_id
 * ORDER BY 
 *     actor.last_update DESC
 * ```
 */
export const getListActors = new PreparedQuery<IGetListActorsParams,IGetListActorsResult>(getListActorsIR);


