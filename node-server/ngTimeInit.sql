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

CREATE TABLE timerecord (
  ID SERIAL PRIMARY KEY,
  task VARCHAR REFERENCES task (ID),
  dat DATE,
  time NUMERIC,
  comment VARCHAR,
  uID INTEGER REFERENCES user_tbl (ID)
);

CREATE TABLE trello_board (
    ID SERIAL PRIMARY KEY,
    uID INTEGER REFERENCES user_tbl (ID),
    boardID VARCHAR UNIQUE,
    boardName VARCHAR,
    flag INTEGER DEFAULT 1,
    UNIQUE(uID, boardID)
);

CREATE TABLE task (
  ID VARCHAR PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  type VARCHAR,
  boardId VARCHAR REFERENCES trello_board (boardid)
);