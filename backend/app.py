from flask import Flask, session, request, jsonify
from flask_cors import CORS
import os
from datetime import timedelta
import pymysql
import uuid

app = Flask(__name__)
app.config["SECRET_KEY"] = os.urandom(24)
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7)
CORS(app, supports_credentials=True, resources=r'/*')

db = pymysql.connect("localhost", "root", "niabbf", "JoinMe")

@app.after_request
def after_request(response):
    # response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response

@app.route('/login', methods=["POST"])
def user_login():
    post_data = request.form.to_dict()
    name = post_data.get("name")
    password = post_data.get("password")
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM `User` WHERE username = '{name}';")
    rec = cursor.fetchone()
    if rec is None:
        ret = ("user not exists", 401)
    elif rec[2] != password:
        ret = ("password wrong", 401)
    else:
        token = str(uuid.uuid4())
        session[name] = token
        session.permanent = True
        ret = (jsonify({'token': token, 'rate': int(float(rec[3])/rec[4] + 0.5)}), 200)
    cursor.close()
    print(ret)
    return ret

@app.route('/signup', methods=["POST"])
def user_signup():
    post_data = request.form.to_dict()
    name = post_data.get("name")
    password = post_data.get("password")
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM `User` WHERE username = '{name}';")
    rec = cursor.fetchone()
    if rec:
        ret = ("username exists", 401)
    else:
        try:
            cursor.execute(f"INSERT INTO `User`(`username`, `password`) VALUES ('{name}', '{password}');")
            db.commit()
            ret = ("success", 200)
        except Exception:
            db.rollback()
            ret = ("Internal Error", 500)
    cursor.close()
    return ret

@app.route('/logout', methods=["POST"])
def user_logout():
    post_data = request.form.to_dict()
    name = post_data.get("name")
    cookie = post_data.get("cookie")
    if session.get(name) == cookie:
        session.pop(name)
    return "success", 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
