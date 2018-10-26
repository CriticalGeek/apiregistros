CREATE DATABASE apiregistros;

USE apiregistros;

CREATE TABLE IF NOT EXISTS `users` (
  `id_relation` INT(255) unsigned NOT NULL AUTO_INCREMENT,
  `email_linker` VARCHAR(255) COLLATE utf8_unicode_ci NULL,
  `email_child` VARCHAR(255) COLLATE utf8_unicode_ci NULL,
  `name_child` VARCHAR(255) COLLATE utf8_unicode_ci NULL,
  `surname_child` VARCHAR(255) COLLATE utf8_unicode_ci NULL,
  PRIMARY KEY(`id_relation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DESCRIBE users;

SELECT * FROM apiregistros.users;