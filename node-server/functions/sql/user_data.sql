SELECT
  name,
  month,
  week,
  task
FROM user_tbl u
  LEFT JOIN (
              SELECT
                uid,
                SUM(time) AS month
              FROM timerecord
              WHERE uid = $1 AND date_trunc('month', current_date) = date_trunc('month', dat)
              GROUP BY 1
            ) m ON m.uid = u.id
  LEFT JOIN (
              SELECT
                uid,
                SUM(time) AS week
              FROM timerecord
              WHERE uid = $1 AND date_trunc('week', current_date) = date_trunc('week', dat)
              GROUP BY 1
            ) w ON w.uid = u.id
  LEFT JOIN (
              SELECT
                t.name AS task,
                uid,
                count(1)
              FROM timerecord r LEFT JOIN task t ON r.task = t.id
              WHERE uid = $1
              GROUP BY 1, 2
              ORDER BY 3 DESC
              LIMIT 1
            ) t ON t.uid = u.id
WHERE id = $1
