SELECT t.id, t.name
FROM task t
LEFT JOIN trello_board b ON t.boardid = b.boardid
WHERE b.uid = $1
AND b.flag = 1;