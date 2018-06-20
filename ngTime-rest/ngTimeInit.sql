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