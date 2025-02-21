/* @name getListActors */
SELECT
    actor.actor_id,
    actor.first_name || ' ' || actor.last_name AS name,
    film.title
FROM
    public."actor" AS actor
LEFT JOIN
    public."film_actor" film_actor ON actor.actor_id = film_actor.actor_id
LEFT JOIN
    public."film" film ON film_actor.film_id = film.film_id
ORDER BY 
    actor.last_update DESC;