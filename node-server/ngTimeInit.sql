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
  ID VARCHAR PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  type VARCHAR
);

CREATE TABLE timerecord (
  ID SERIAL PRIMARY KEY,
  task VARCHAR REFERENCES task (ID),
  dat DATE,
  time NUMERIC,
  comment VARCHAR,
  uID INTEGER REFERENCES user_tbl (ID)
);
