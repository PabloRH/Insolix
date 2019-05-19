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
  Type      	        ENUM('Usuario', 'Administrador','Fotografo','Editor','Operador','Ing. Soporte','Gerente Soporte','Ing. Mantenimiento', 'Gerente Mantenimiento') NOT NULL, 
	PRIMARY KEY(ID),
	UNIQUE(Email, User)
);

DROP TABLE IF EXISTS Photo;
CREATE TABLE Photo (
	UserID		     INT NOT NULL,
	HashID	      	VARCHAR(60) NOT NULL,
	FOREIGN KEY (UserID) REFERENCES User(ID)
);


DROP TABLE IF EXISTS Report;
CREATE TABLE Report (
  UserID		     INT,
	NoReporte      INT AUTO_INCREMENT,
	Tipo           VARCHAR(60),
	Nombre         VARCHAR(60),
	Respues				 VARCHAR(256),
	AsigID				 VARCHAR(60),
	Estado				 VARCHAR(60),
	Reporte		  	 VARCHAR(256),
	Fecha		    	 VARCHAR(60),
PRIMARY KEY(NoReporte),
FOREIGN KEY (UserID) REFERENCES User(ID),
UNIQUE(Nombre, NoReporte)
);

INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Pablo','PabloRH','resistence25@gmail.com','123',18,'Mexico','Male','Student','Hi, I really wanna die','Editor');


INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Gaddi','GaddiAR','GaddiAR@gmail.com','123',18,'Mexico','Male','Student','Hi','Ing. Soporte');


INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Ceron','CeronCa','CeronCa@gmail.com','123',18,'Mexico','Male','Student','Hi','Gerente Soporte');


INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Fer','Fernanda','Fernan@gmail.com','123',18,'Mexico','Female','Student','Hi','Gerente Mantenimiento');

INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Oscar','Osc','Oscar@gmail.com','123',18,'Mexico','Male','Student','Hi','Ing. Mantenimiento');

INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Leslie','Les','Leslie@gmail.com','123',18,'Mexico','Female','Student','Hi','Operador');

INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Admin','Ad','Admin@gmail.com','123',18,'Mexico','Na','Student','Hi','Administrador');

INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('user','user','user@gmail.com','123',18,'Mexico','Na','Student','Hi','Usuario');

INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Fotografo','foto','foto@gmail.com','123',18,'Mexico','Na','Student','Hi','Fotografo');

	

DROP TABLE IF EXISTS FAQs;
CREATE TABLE FAQs (
	IDPregu         INT AUTO_INCREMENT,
	NoPregu       	INT,
	Pregunta        VARCHAR(256),
	Respuesta       VARCHAR(256),
	Likes				    INT NOT NULL,
	Dislikes	   	  INT NOT NULL,
PRIMARY KEY(IDPregu),
UNIQUE(IDPregu, NoPregu)
);


