DROP TABLE IF EXISTS User;
CREATE TABLE User (
	ID                  INT NOT NULL AUTO_INCREMENT,
	Name                VARCHAR(30) NOT NULL,
	User            	VARCHAR(30) NOT NULL,
	Email               VARCHAR(30) NOT NULL,
	Password            CHAR(32) NOT NULL,
	Age                 INT,
	Residence           VARCHAR(60),
	Gender              VARCHAR(15),
	Profesion           VARCHAR(20),
	Descrip             VARCHAR(256),
    Type      	        ENUM('Usuario', 'Administrador','Fotografo','Editor','Operador','Ing. Soporte') NOT NULL, 
	PRIMARY KEY(ID),
	UNIQUE(Email, User)
);

DROP TABLE IF EXISTS Photo;
CREATE TABLE Photo (
	UserID		     INT NOT NULL,
	HashID	      	VARCHAR(60) NOT NULL,
	FOREIGN KEY (UserID) REFERENCES User(ID)
);


INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Pablo','PabloRH','resistence25@gmail.com','123',18,'Mexico','Male','Student','Hi, I really wanna die','Editor');