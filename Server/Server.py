from flask import Flask, request, json, session, redirect
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


@app.route('/logIn', methods = ['POST'])
def index():
    with Der.cursor(MySQLdb.cursors.DictCursor) as DB:
        data = request.get_json(force=True)

        name = data['name']
        password = data['password']

        query = f'SELECT ID FROM User WHERE Name="{name}" AND Password="{password}"'
        DB.execute(query)
        row = DB.fetchone()
        return json.dumps(row)


@app.route('/log')
def logout():
    Der.close()
    return ""