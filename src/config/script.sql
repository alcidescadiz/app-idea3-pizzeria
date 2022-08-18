CREATE TABLE `test`.`invoice` ( 
    `id` INT NOT NULL AUTO_INCREMENT ,  
    `id_user` INT NOT NULL ,  
    `total` INT NOT NULL ,  
    `date` VARCHAR(100) NOT NULL ,  
    `details` JSON NOT NULL ,   
     PRIMARY KEY  (`id`)
) ENGINE = InnoDB;