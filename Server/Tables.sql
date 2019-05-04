DROP TABLE IF EXISTS User;
CREATE TABLE User (
	ID                  INT NOT NULL AUTO_INCREMENT,
	Name                VARCHAR(30) NOT NULL,
	User            VARCHAR(30) NOT NULL,
	Email               VARCHAR(30) NOT NULL,
	Password            CHAR(32) NOT NULL,
    Type      	        ENUM('User', 'Admin'),
	PRIMARY KEY(ID),
	UNIQUE(Email, User)
);

