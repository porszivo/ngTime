DROP DATABASE IF EXISTS ngtime;
CREATE DATABASE ngtime;

\c ngtime;

CREATE TABLE user_tbl (
  ID SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE,
  password VARCHAR,
  email VARCHAR,
  confirmhash VARCHAR,
  activated BOOLEAN default FALSE,
  failed_try INTEGER default 0
);

CREATE TABLE task (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR
);

CREATE TABLE timerecord (
  ID SERIAL PRIMARY KEY,
  task INTEGER REFERENCES task (ID),
  dat DATE,
  time NUMERIC,
  comment VARCHAR,
  uID INTEGER REFERENCES user_tbl (ID)
);

INSERT INTO task (name, description)
    VALUES('Frontend', 'Angular Frontend');

INSERT INTO task (name, description)
VALUES('Backend', 'Node Backend');