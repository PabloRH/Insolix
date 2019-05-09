DROP PROCEDURE IF EXISTS LogIn;
DELIMITER //
CREATE PROCEDURE LogIn (IN _user VARCHAR(25), IN _password VARCHAR(25))
    BEGIN
        SELECT * FROM User 
            WHERE 
                User = _user AND 
                Password = _password;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS SignUp;
DELIMITER //
CREATE PROCEDURE SignUp (IN _name VARCHAR(25), IN _user VARCHAR(25), IN _email VARCHAR(25), IN _password VARCHAR(25), IN _types VARCHAR(25))
    BEGIN
        INSERT INTO User(Name, User, Email, Password, Type)  
            VALUES(
                _name,
                _user,
                _email,
                _password,
                _types
            );
        SELECT ID FROM User
            WHERE
                User = _user AND 
                Password = _password;
    END //
DELIMITER ;


DROP PROCEDURE IF EXISTS Photos;
DELIMITER //
CREATE PROCEDURE Photos (IN _ID INT)
    BEGIN
        SELECT HashID FROM Photo  
            WHERE UserID = _ID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS Upload;
DELIMITER //
CREATE PROCEDURE Upload (IN _ID INT, IN _HASHID VARCHAR(60))
    BEGIN
        INSERT INTO Photo(UserID, HashID)
            VALUES(
                _ID,
                _HASHID
            );
    END //
DELIMITER ;


DROP PROCEDURE IF EXISTS OtherPhotos;
DELIMITER //
CREATE PROCEDURE OtherPhotos (IN _ID INT)
    BEGIN
        SELECT Photo.HashID, User.Name FROM Photo, User  
            WHERE UserID <> _ID AND UserID = User.ID;
        
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS MoreInf;
DELIMITER //
CREATE PROCEDURE MoreInf (IN _ID INT, IN _age INT, IN _gender VARCHAR(60), IN _residence VARCHAR(15), IN _profesion VARCHAR(20), IN _descrip VARCHAR(256))
    BEGIN
        UPDATE User
            SET Age=_age, Residence=_residence, Gender=_gender, Profesion=_profesion, Descrip=_descrip
            WHERE ID = _ID;
    END //
DELIMITER ;