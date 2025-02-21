/** Types generated for queries found in "src/queries/dvd-rental/dvd-rental.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** Query 'GetListActors' is invalid, so its result is assigned type 'never'.
 *  */
export type IGetListActorsResult = never;

/** Query 'GetListActors' is invalid, so its parameters are assigned type 'never'.
 *  */
export type IGetListActorsParams = never;

const getListActorsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n        actor.actor_id,\n        actor.first_name || ' ' || actor.last_name AS name,\n        film.title\n    FROM\n        public.\"actor\" AS actor\n    LEFT JOIN\n        public.\"film_actor\" film_actor ON actor.actor_id = film_actor.actor_id\n    LEFT JOIN\n        public.\"film\" film ON film_actor.film_id = film.film_id\n    ORDER BY \n        actor.last_update DESC\n    LIMIT 10 OFFSET 1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *         actor.actor_id,
 *         actor.first_name || ' ' || actor.last_name AS name,
 *         film.title
 *     FROM
 *         public."actor" AS actor
 *     LEFT JOIN
 *         public."film_actor" film_actor ON actor.actor_id = film_actor.actor_id
 *     LEFT JOIN
 *         public."film" film ON film_actor.film_id = film.film_id
 *     ORDER BY 
 *         actor.last_update DESC
 *     LIMIT 10 OFFSET 1
 * ```
 */
export const getListActors = new PreparedQuery<IGetListActorsParams,IGetListActorsResult>(getListActorsIR);


