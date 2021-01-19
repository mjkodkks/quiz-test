## Instuction for Run Project

### 1) Database Prepare
spec : mysql

copy text inside ```db.txt``` to execute for create screma and table 

or

use sql command :
```
CREATE SCHEMA `dbapp` DEFAULT CHARACTER SET utf8 ;
USE `dbapp` 
CREATE TABLE `dbapp`.`profile` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `birthday` VARCHAR(45) NULL,
  `age` INT(11) NULL,
  `idcard` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
```
edit credencial DB in ```source/server/.env```
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=dbapp
```

### 2) Backend
spec : nodejs 12+

in folder ```source/server``` run following command

```
npm install

node index.js
``` 
backend will start in http://localhost:9000

and API in path http://localhost:9000/saveProfile

after that...

### 3) Frontend
spec : vuejs

in folder ```source/web``` run following command
```
yarn

yarn serve
```
frontend will start in http://localhost:8080