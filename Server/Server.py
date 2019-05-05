from flask import Flask, request, json
import MySQLdb
app = Flask(__name__)

app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_FILE_THRESHOLD'] = 500
app.config['SESSION_FILE_DIR'] = "Sesions"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = 86400

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

Der = MySQLdb.connect(
    host       = 'PabloRosas.mysql.pythonanywhere-services.com',
    user       = 'PabloRosas',
    passwd   = 'xico2312252342',
    db         = 'PabloRosas$Derbild',
)


@app.route('/')
def index():
    return "hi"

@app.route('/logIn', methods = ['POST'])
def logIn():
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        user = data['user']
        password = data['password']

        DB.callproc("LogIn", [user, password])
        row = DB.fetchone()
        return json.dumps(row)


@app.route('/SignUp', methods = ['Post'])
def Sing():
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        name = data['name']
        user = data['user']
        password = data['password']
        types = data['type']
        email   = data['email']
        DB.callproc("SignUp", [name, user, email, password, types])
        row = DB.fetchone()
        return json.dumps(row)

@app.route('/log')
def logout():
    Der.close()
    return ""
