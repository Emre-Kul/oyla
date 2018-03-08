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
	`deadline` DATE,
	`is_visible` BOOLEAN NOT NULL DEFAULT 0,  	-- 1-> Survey is accessible, 0-> It is only seen by it's creator
	`visible_to_users` BOOLEAN NOT NULL DEFAULT 0,	-- 0-> Survey is visible to registered users. 1-> Visible to everyone
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
	`description` TEXT NOT NULL,   			
	`multiple_choice` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `MULTIPLE_CHOICE` (
	`id` BINARY NOT NULL AUTO_INCREMENT,
	`question_id` BINARY NOT NULL,
	`description` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ANSWER` (
	`id` BINARY NOT NULL AUTO_INCREMENT,	-- Distinct id for each answer
	`description` TEXT NOT NULL,		-- Answer of the question
	`question_id` BINARY NOT NULL,		-- ID of the question which will be answered
	`survey_id` BINARY NOT NULL,  		-- ID of the survey where question's asked
	`user_id` BINARY NOT NULL,    		-- ID of the user who answered the question
	PRIMARY KEY ('id')
);

ALTER TABLE `SURVEY` ADD CONSTRAINT `SURVEY_fk0` FOREIGN KEY (`created_by`) REFERENCES `USER`(`id`);

ALTER TABLE `PROFILE` ADD CONSTRAINT `PROFILE_fk0` FOREIGN KEY (`user_id`) REFERENCES `USER`(`id`);

ALTER TABLE `QUESTION` ADD CONSTRAINT `QUESTION_fk0` FOREIGN KEY (`survey_id`) REFERENCES `SURVEY`(`id`);

ALTER TABLE `MULTIPLE_CHOICE` ADD CONSTRAINT `MULTIPLE_CHOICE_fk0` FOREIGN KEY (`question_id`) REFERENCES `QUESTION`(`id`);

ALTER TABLE `ANSWER` ADD CONSTRAINT `ANSWER_fk0` FOREIGN KEY (`question_id`) REFERENCES `QUESTION`(`ìd`);

ALTER TABLE `ANSWER` ADD CONSTRAINT `ANSWER_fk1` FOREIGN KEY (`survey_id`) REFERENCES `SURVEY`(`id`);

ALTER TABLE `ANSWER` ADD CONSTRAINT `ANSWER_fk2` FOREIGN KEY (`user_id`) REFERENCES `USER`(`id`);
