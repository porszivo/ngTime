SELECT
  max(name)   AS name,
  max(week)  AS week,
  max(month) AS month,
  max(task)  AS task
FROM (
       SELECT
         name,
         SUM(time) AS week,
         NULL      AS month,
         NULL      AS task
       FROM timerecord r1
         LEFT JOIN user_tbl u ON r1.uid = u.id
       WHERE uid = $1 AND date_trunc('week', current_date) = date_trunc('week', dat)
       GROUP BY 1
       UNION ALL
       SELECT
         name,
         NULL,
         sum(time),
         NULL
       FROM timerecord r2
         LEFT JOIN user_tbl u ON r2.uid = u.id
       WHERE uid = $1 AND date_trunc('month', current_date) = date_trunc('month', dat)
       GROUP BY 1, date_trunc('month', dat)
       UNION ALL
       SELECT
         NULL,
         NULL,
         NULL,
         task
       FROM (
              SELECT
                count(1) AS ctn,
                t.name as task
              FROM timerecord r
              LEFT JOIN task t ON t.id = r.task
              WHERE uid = $1
              GROUP BY 2
              ORDER BY 2
              LIMIT 1
            ) u
     ) AS a;