DROP DATABASE IF EXISTS movieRack;
CREATE DATABASE movieRack;
USE movieRack;

CREATE TABLE USER
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NULL,
	age INTEGER(10) NOT NULL,
	gender varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE MOVIE (
	id int NOT NULL AUTO_INCREMENT,
	title varchar(255) NOT NULL,
	year_released varchar(10) NOT NULL,
	movie_img_html varchar(255) NOT NULL,
	rating varchar(255) NOT NULL,
	review varchar(255) NOT NULL,
	PRIMARY KEY (id)
);