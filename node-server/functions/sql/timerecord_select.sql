select r.id, r.task, r.dat, r.time, r.comment, t.name from timerecord r 
left join task t on t.id = r.task where uid = $1 ORDER BY r.dat DESC