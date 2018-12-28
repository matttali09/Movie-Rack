DROP DATABASE IF EXISTS movieRack;
CREATE DATABASE movieRack;
USE movieRack;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);