from flask import Flask, request, json
import MySQLdb, os
from werkzeug import secure_filename

app = Flask(__name__)

app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_FILE_THRESHOLD'] = 500
app.config['SESSION_FILE_DIR'] = "Sesions"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = 86400

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

STATIC_ROOT = (os.path.join(os.path.dirname(__file__), "static"))


@app.route('/')
def index():
    return "hi"

@app.route('/logIn', methods = ['POST'])
def logIn():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)

    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        user = data['user']
        password = data['password']

        DB.callproc("LogIn", [user, password])
        row = DB.fetchone()
        if row == None:
            data = json.dumps({"ID": None})
        else:
            row["Age"] = str(row["Age"])
            data = json.dumps(row)
        DB.close()
        Der.close()
        return data



@app.route('/SignUp', methods = ['Post'])
def SignUp():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        name = data['name']
        user = data['user']
        password = data['password']
        types = data['types']
        email   = data['email']
        DB.callproc("SignUp", [name, user, email, password, types])
        row = DB.fetchone()
        data= json.dumps(row)

        DB.close()
        Der.close()
        return data

@app.route('/GetPhotos', methods = ['Post'])
def GetPhotos():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        ID = data['id']
        DB.callproc("Photos", [ID])
        rows = DB.fetchall()
        data= json.dumps(rows)

        DB.close()
        Der.close()
        return data


@app.route('/upload_file', methods = ['POST'])
def upload_file():
        Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
        )
        Der.autocommit(True)

        photo = request.files['photo']
        realFilename = secure_filename(photo.filename)
        photo.save(os.path.join(STATIC_ROOT, realFilename))

        with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
            ID = photo.filename.split(" ")[0]
            DB.callproc("Upload",[ID, realFilename])

            return realFilename

@app.route('/OthersPhotos', methods = ['Post'])
def OthersPhotos():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        ID = data['id']
        DB.callproc("OtherPhotos", [ID])
        rows = DB.fetchall()
        data= json.dumps(rows)

        DB.close()
        Der.close()
        return data

@app.route('/MoreInfo', methods = ['Post'])
def MoreInfo():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        Age = data['Age']
        Gender = data['Gender']
        Residence = data['Residence']
        Profesion = data['Profesion']
        Descrip   = data['Descrip']
        ID   = data['id']
        DB.callproc("MoreInf", [ID, Age, Residence, Gender, Profesion, Descrip])
        row = DB.fetchone()
        data= json.dumps(row)

        DB.close()
        Der.close()
        return data

@app.route('/Reportes', methods = ['Post'])
def Reportes():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        Report = data['Reporte']
        ID   = data['id']
        DB.callproc("Report", [ID, Report])
        row = DB.fetchone()
        data= json.dumps(row)

        DB.close()
        Der.close()
        return data

@app.route('/ReportesEve', methods = ['Post'])
def ReportesEve():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        Nombre = data['NomReport']
        Report = data['Reporte']
        Date = data['Fecha']
        ID   = data['id']
        Tipo = data['tipo']
        DB.callproc("ReportEve", [ID, Nombre, Report, Tipo, Date])
        row = DB.fetchone()
        data= json.dumps(row)

        DB.close()
        Der.close()
        return data

@app.route('/log')
def logout():
    return ""

@app.route('/GetReports', methods = ['Post'])
def GetReports():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:

        DB.callproc("GetReports", )
        row = DB.fetchall()
        data= json.dumps(row)

        DB.close()
        Der.close()
        return data

@app.route('/GetMante', methods = ['Post'])
def GetMante():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:

        DB.callproc("GetReportMante", )
        row = DB.fetchall()
        data= json.dumps(row)

        DB.close()
        Der.close()
        return data

@app.route('/UpdateOpera', methods = ['Post'])
def UpdateOpera():
    Der = MySQLdb.connect(
        host       = 'PabloRosas.mysql.pythonanywhere-services.com',
        user       = 'PabloRosas',
        passwd   = 'xico2312252342',
        db         = 'PabloRosas$Derbild',
    )
    Der.autocommit(True)
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        Fecha = data['Fecha']
        Nombre = data['Nombre']
        Tipo = data['Tipo']
        Reporte = data['Reporte']
        NoReporte   = data['NoReporte']
        AsigID = data['AsigID']
        Respues = data['Respues']
        Estado = data['Estado']
        DB.callproc("Operador", [Fecha, Nombre, Tipo, Reporte, NoReporte, AsigID, Respues, Estado])
        row = DB.fetchone()
        data= json.dumps(row)

        DB.close()
        Der.close()
        return data

