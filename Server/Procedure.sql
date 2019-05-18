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
            WHERE UserID <> _ID AND UserID = User.ID ORDER BY RAND();
        
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

DROP PROCEDURE IF EXISTS ReportEve;
DELIMITER //
CREATE PROCEDURE ReportEve (IN _ID INT, IN _Nombre VARCHAR(25), IN _Report VARCHAR(256), IN _Tipo VARCHAR(25), IN _Date VARCHAR(25))
    BEGIN
        INSERT INTO ReportEve(UserID, Nombre, Tipo, Reporte, Fecha)  
            VALUES(
                _ID,
                _Nombre,
                _Tipo,
                _Report,
                _Date
            );
        SELECT NoReporte FROM ReportEve
            WHERE
                Nombre = _Nombre AND 
                UserID = _ID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS Report;
DELIMITER //
CREATE PROCEDURE Report (IN _ID INT, IN _Report VARCHAR(256))
    BEGIN
        INSERT INTO Report(UserID, Reporte)  
            VALUES(
                _ID,
                _Report
            );
    END //
DELIMITER ;



DROP PROCEDURE IF EXISTS RepoE;
DELIMITER //
CREATE PROCEDURE RepoE (IN _user VARCHAR(25), IN _password VARCHAR(25))
    BEGIN
        SELECT * FROM User 
            WHERE 
                User = _user AND 
                Password = _password;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS GetReports;
DELIMITER //
CREATE PROCEDURE GetReports ()
    BEGIN
        SELECT * FROM Report WHERE Estado IS NULL OR Estado != "Cerrado";
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS GetReportMante;
DELIMITER //
CREATE PROCEDURE GetReportMante ()
    BEGIN
        SELECT * FROM Report WHERE Tipo = "Mantenimiento";
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS Operador;
DELIMITER //
CREATE PROCEDURE Operador (IN _fecha VARCHAR(65), IN _Nombre VARCHAR(65), IN _Tipo VARCHAR(65), IN _Repo VARCHAR(65), IN _IDRepo INT, IN _AsigID INT, IN _Respues VARCHAR(256), IN _Estado VARCHAR(65))
    BEGIN
        UPDATE Report
            SET Fecha=_fecha, Nombre=_Nombre, Tipo=_Tipo, Reporte=_Repo, AsigID=_AsigID, Respues=_Respues, Estado=_Estado
            WHERE NoReporte = _IDRepo;
    END //
DELIMITER ;


DROP PROCEDURE IF EXISTS GetFaq;
DELIMITER //
CREATE PROCEDURE GetFaq ()
    BEGIN
        SELECT * FROM FAQs;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS SetFaq;
DELIMITER //
CREATE PROCEDURE SetFaq (IN _NumeroPreg INT, IN _Preg VARCHAR(256), IN _Resp VARCHAR(256))
    BEGIN
        INSERT INTO FAQs(NoPregu, Pregunta, Respuesta)  
            VALUES(
                _NumeroPreg,
                _Preg,
                _Resp
            );
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS UpdatePreg;
DELIMITER //
CREATE PROCEDURE UpdatePreg (IN _NoPregu VARCHAR(65), IN _Pregunta VARCHAR(65), IN _Respuesta VARCHAR(65), IN _IDPregu INT)
    BEGIN
        UPDATE FAQs
            SET NoPregu=_NoPregu, Pregunta=_Pregunta, Respuesta=_Respuesta
            WHERE IDPregu = _IDPregu;
    END //
DELIMITER ;

