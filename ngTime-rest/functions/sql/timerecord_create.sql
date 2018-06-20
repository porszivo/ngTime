INSERT INTO timerecord(task, dat, time, comment, uid)
VALUES (${task}, to_date(${dat}, 'YYYY-MM-DD'), ${duration}, ${comment}, ${id})