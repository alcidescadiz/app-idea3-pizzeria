## MYSQL
CREATE TABLE `test`.`invoice` ( 
    `id` INT NOT NULL AUTO_INCREMENT ,  
    `id_user` INT NOT NULL ,  
    `total` INT NOT NULL ,  
    `date` VARCHAR(100) NOT NULL ,  
    `details` JSON NOT NULL ,   
     PRIMARY KEY  (`id`)
) ENGINE = InnoDB;

CREATE TABLE `test`.`users` ( 
    `id` INT NOT NULL AUTO_INCREMENT , 
    `name` VARCHAR(255) NOT NULL , 
    `email` VARCHAR(255) NOT NULL UNIQUE, 
    `password` VARCHAR(255) NOT NULL , 
    `role` VARCHAR(255) NOT NULL , 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

## POSTGRES
CREATE TABLE invoice ( 
    id SERIAL PRIMARY KEY,  
    id_user INT NOT NULL ,  
    total NUMERIC NOT NULL ,  
    date VARCHAR(100) NOT NULL ,  
    details JSON NOT NULL 
) 

CREATE TABLE users ( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL , 
    email VARCHAR(255) NOT NULL , 
    password VARCHAR(255) NOT NULL , 
    role VARCHAR(255) NOT NULL , 
    UNIQUE(email)
) 