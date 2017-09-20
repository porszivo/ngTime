INSERT INTO timerecord(task, dat, time, comment, uid)
VALUES (${task}, to_date(${dat}, 'DD-MM-YYYY'), ${duration}, ${comment}, ${id})