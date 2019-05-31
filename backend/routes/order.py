from flask import Blueprint, request, make_response
from datetime import datetime

from common.mysql_connector import db
from common.auth import auth

order = Blueprint("order", __name__)

@order.route('/startorder', methods=["POST"])
@auth
def start_order():
    post_data = request.form.to_dict()
    user = post_data.get("user")
    place_from = post_data.get("from")
    place_to = post_data.get("to")
    start_dt = datetime.strptime(post_data.get("datetime"), "%Y-%m-%d %H:%M")
    start_dt = start_dt.strftime("%Y%m%d%H%M%S")
    cursor = db.cursor()
    try:
        sql = f"INSERT INTO `Task`(`initiator`, `num_connect`, `from`, `to`, `starttime`) VALUES ('{user}', 1, '{place_from}', '{place_to}', {start_dt});"
        cursor.execute(sql)
        cursor.execute(f"SELECT LAST_INSERT_ID();")
        task_id = cursor.fetchone()[0]
        sql = f"INSERT INTO `Relation`(`username`, `task_id`, `status`) VALUES ('{user}', {task_id}, 0);"
        cursor.execute(sql)
        db.commit()
        response = make_response("success", 200)
    except Exception:
        db.rollback()
        response = make_response("Internal Error", 500)
    cursor.close()
    return response

@order.route('/getselforder', methods=["POST"])
@auth
def get_self_order():
    post_data = request.form.to_dict()
    user = post_data.get("user")
    cursor = db.cursor()
    try:
        sql = f"SELECT * FROM `User` LEFT JOIN (`Relation`, `Task`) ON (User.username=Relation.username AND Relation.task_id=Task.id) WHERE User.username='{user}';"
        cursor.execute(sql)
        rec = cursor.fetchall()
        response = make_response(rec, 200)
    except Exception:
        response = make_response("Internal Error", 500)
    cursor.close()
    return response
