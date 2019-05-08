from flask import Flask, request, json
import MySQLdb
from werkzeug import secure_filename

app = Flask(__name__)

app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_FILE_THRESHOLD'] = 500
app.config['SESSION_FILE_DIR'] = "Sesions"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = 86400

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


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
  f = request.files['photo']
  f.save(secure_filename(f.filename))
  return 'file uploaded successfully'
      
@app.route('/log')
def logout():
    return ""
