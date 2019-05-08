DROP TABLE IF EXISTS User;
CREATE TABLE User (
	ID                  INT NOT NULL AUTO_INCREMENT,
	Name                VARCHAR(30) NOT NULL,
	User            	VARCHAR(30) NOT NULL,
	Email               VARCHAR(30) NOT NULL,
	Password            CHAR(32) NOT NULL,
    Type      	        ENUM('Usuario', 'Administrador','Fotografo','Editor','Operador','Ing. Soporte') NOT NULL, 
	PRIMARY KEY(ID),
	UNIQUE(Email, User)
);

DROP TABLE IF EXISTS Photo;
CREATE TABLE Photo (
	UserID		INT NOT NULL,
	Name 		VARCHAR(40) NOT NULL,
	HashID		BLOB,
	FOREIGN KEY (UserID) REFERENCES User(ID)
);
