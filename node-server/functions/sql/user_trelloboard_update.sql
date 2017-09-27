UPDATE trello_board
SET boardid = ${val}
WHERE uid = ${id} AND boardid = ${old}