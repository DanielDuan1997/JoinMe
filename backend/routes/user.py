from flask import Blueprint, request, make_response, jsonify
from datetime import datetime
import uuid
import json

from common.redis_connector import get_redis
from common.mysql_connector import db

user = Blueprint("user", __name__)

@user.route('/login', methods=["POST"])
def user_login():
    data = json.loads(request.data.decode('utf-8'))
    user = data.get("user")
    password = data.get("password")
    if user is None:
        return make_response("user not exists", 401)
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM `User` WHERE username = '{user}';")
    rec = cursor.fetchone()
    cursor.close()
    if rec is None:
        response = make_response("user not exists", 401)
    elif rec[2] != password:
        response = make_response("password wrong", 401)
    else:
        token = str(uuid.uuid4())
        redis = get_redis()
        redis.set(token+':user', user, ex=3600*24)
        redis.set(token+':nickname', rec[1], ex=3600*24)
        redis.set(token+':last_login', datetime.now().strftime("%Y%m%d%H%M%S"), ex=3600*24)
        response = make_response(jsonify({'token': token, 'nickname': rec[1], 'rate': int(float(rec[3])/rec[4] + 0.5)}), 200)
    cursor.close()
    return response

@user.route('/signup', methods=["POST"])
def user_signup():
    data = json.loads(request.data.decode('utf-8'))
    user = data.get("user")
    password = data.get("password")
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM `User` WHERE username = '{user}';")
    rec = cursor.fetchone()
    if rec:
        response = make_response("username exists", 401)
    else:
        try:
            cursor.execute(f"INSERT INTO `User`(`username`, `nickname`, `password`) VALUES ('{user}', '{user}', '{password}');")
            db.commit()
            response = make_response("success", 200)
        except Exception:
            db.rollback()
            response = make_response("Internal Error", 500)
    cursor.close()
    return response
