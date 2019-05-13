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

DROP TABLE IF EXISTS Report;
CREATE TABLE Report (
  UserID		     INT NOT NULL,
	Reporte		  	 VARCHAR(256) NOT NULL,
FOREIGN KEY (UserID) REFERENCES User(ID)
);

DROP TABLE IF EXISTS ReportEve;
CREATE TABLE ReportEve (
  UserID		     INT NOT NULL,
	NoReporte      INT NOT NULL AUTO_INCREMENT,
	Tipo           VARCHAR(60) NOT NULL,
	Nombre         VARCHAR(60) NOT NULL,
	Respues				 VARCHAR(256),
	AsigID				 VARCHAR(60),
	Estado				 VARCHAR(60),
	Reporte		  	 VARCHAR(256) NOT NULL,
	Fecha		    	 VARCHAR(60) NOT NULL,
PRIMARY KEY(NoReporte),
FOREIGN KEY (UserID) REFERENCES User(ID),
UNIQUE(Nombre, NoReporte)
);

INSERT INTO User(Name,User,Email,Password,Age,Residence,Gender,Profesion,Descrip,Type) 
	VALUES ('Pablo','PabloRH','resistence25@gmail.com','123',18,'Mexico','Male','Student','Hi, I really wanna die','Editor');