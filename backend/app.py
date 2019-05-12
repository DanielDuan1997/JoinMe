from flask import Flask, session, request
from flask_cors import CORS
import os
from datetime import timedelta

from common.utils import open_db, close_db

app = Flask(__name__)
app.config["SECRET_KEY"] = os.urandom(24)
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7)
CORS(app, supports_credentials=True, resources=r'/*')

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response

@app.route('/login', methods=["POST"])
def user_login():
    post_data = request.form.to_dict()
    name = post_data.get("name")
    password = post_data.get("password")
    db = open_db()
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM `User` WHERE username = '{name}';")
    ret = cursor.fetchone()
    close_db(db)
    if ret is None:
        return "user not exists", 401
    elif ret.get("password") != password:
        return "password wrong", 401
    else:
        token = str(uuid.uuid4())
        session["name"] = token
        session.permanent = True
        return token, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
