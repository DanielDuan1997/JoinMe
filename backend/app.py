from flask import Flask, session
from flask import make_response, request, jsonify
from flask_cors import CORS
import os
from datetime import timedelta
import pymysql
import uuid
from datetime import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = "Daniel"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7)
CORS(app, supports_credentials=True, resources=r'/*')

db = pymysql.connect("localhost", "root", "niabbf", "JoinMe")

@app.after_request
def after_request(response):
    # response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response

@app.route('/try', methods=["POST"])
def have_a_try():
    post_data = request.form.to_dict()
    response = make_response(session.get(post_data.get("name")))
    print(type(response))
    return response

@app.route('/login', methods=["POST"])
def user_login():
    post_data = request.form.to_dict()
    name = post_data.get("name")
    password = post_data.get("password")
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM `User` WHERE username = '{name}';")
    rec = cursor.fetchone()
    cursor.close()
    if rec is None:
        response = make_response("user not exists", 401)
    elif rec[2] != password:
        response = make_response("password wrong", 401)
    else:
        token = str(uuid.uuid4())
        session[name] = token
        session.permanent = True
        response = make_response(jsonify({'token': token, 'rate': int(float(rec[3])/rec[4] + 0.5)}), 200)
    cursor.close()
    print(type(response))
    return response

@app.route('/signup', methods=["POST"])
def user_signup():
    post_data = request.form.to_dict()
    name = post_data.get("name")
    password = post_data.get("password")
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM `User` WHERE username = '{name}';")
    rec = cursor.fetchone()
    if rec:
        response = make_response("username exists", 401)
    else:
        try:
            cursor.execute(f"INSERT INTO `User`(`username`, `password`) VALUES ('{name}', '{password}');")
            db.commit()
            response = make_response("success", 200)
        except Exception:
            db.rollback()
            response = make_response("Internal Error", 500)
    cursor.close()
    return response

def validate(user, cookie):
    return session.get(user) == cookie

@app.route('/logout', methods=["POST"])
def user_logout():
    post_data = request.form.to_dict()
    name = post_data.get("name")
    cookie = post_data.get("cookie")
    print(session)
    if validate(name, cookie):
        session.pop(name)
    return "success", 200

@app.route('/startorder', methods=["POST"])
def start_order():
    print(session)
    post_data = request.form.to_dict()
    user = post_data.get("user")
    cookie = post_data.get("cookie")
    if not validate(user, cookie):
        return make_response("User Expiration", 401)
    place_from = post_data.get("from")
    place_to = post_data.get("to")
    start_dt = datetime.strptime(post_data.get("datetime"), "%Y-%m-%d %H:%M")
    start_dt = start_dt.strftime("%Y%m%d%H%M%S")
    sql = f"INSERT INTO `Task`(`initiator`, `num_connect`, `from`, `to`, `starttime`) VALUES ('{user}', 1, '{place_from}', '{place_to}', '{start_dt}')"
    cursor = db.cursor()
    try:
        cursor.execute(sql)
        db.commit()
        response = make_response("success", 200)
    except Exception:
        db.rollback()
        response = make_response("Internal Error", 500)
    cursor.close()
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
