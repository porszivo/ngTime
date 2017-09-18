DROP DATABASE IF EXISTS ngtime;
CREATE DATABASE ngtime;

\c ngtime;

CREATE TABLE task (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR
);

CREATE TABLE timerecord (
  ID SERIAL PRIMARY KEY,
  task INTEGER REFERENCES task (ID),
  dat VARCHAR,
  time NUMERIC,
  comment VARCHAR
);

INSERT INTO task (name, description)
    VALUES('Frontend', 'Angular Frontend');

INSERT INTO task (name, description)
VALUES('Backend', 'Node Backend');

INSERT INTO timerecord (task, dat, time, comment)
    VALUES(1, '16.09.2017', '1', 'Ging einwandfrei');

INSERT INTO timerecord (task, dat, time, comment)
VALUES(2, '16.09.2017', '1', 'Setup Nodejs Server');

-- TODO: Needs to make secure
CREATE TABLE user_tbl (
  ID SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE,
  password VARCHAR,
  salt VARCHAR
);