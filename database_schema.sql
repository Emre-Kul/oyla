CREATE TABLE `USER` (
	`id` BINARY NOT NULL AUTO_INCREMENT,
	`user_name` varchar(50) NOT NULL AUTO_INCREMENT UNIQUE,
	`password` varchar(250) NOT NULL AUTO_INCREMENT,
	`email` varchar(250) NOT NULL AUTO_INCREMENT UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `SURVEY` (
	`id` BINARY NOT NULL AUTO_INCREMENT,
	`created_by` BINARY NOT NULL,
	`title` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`create_date` DATE NOT NULL,
	`update_date` DATE NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `PROFILE` (
	`id` BINARY NOT NULL AUTO_INCREMENT,
	`user_id` BINARY NOT NULL,
	`name` varchar(100) NOT NULL,
	`surname` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `QUESTION` (
	`id` BINARY NOT NULL AUTO_INCREMENT,
	`survey_id` BINARY NOT NULL,
	`multiple_choice` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `SURVEY` ADD CONSTRAINT `SURVEY_fk0` FOREIGN KEY (`created_by`) REFERENCES `USER`(`id`);

ALTER TABLE `PROFILE` ADD CONSTRAINT `PROFILE_fk0` FOREIGN KEY (`user_id`) REFERENCES `USER`(`id`);

ALTER TABLE `QUESTION` ADD CONSTRAINT `QUESTION_fk0` FOREIGN KEY (`survey_id`) REFERENCES `SURVEY`(`id`);
