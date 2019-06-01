import json
from flask import Blueprint, request, make_response
from datetime import datetime

from common.mysql_connector import db
from common.auth import auth

order = Blueprint("order", __name__)

@order.route('/startorder', methods=["POST"])
@auth
def start_order():
    data = json.loads(request.data.decode('utf-8'))
    user = data.get("user")
    place_from = data.get("from")
    place_to = data.get("to")
    start_dt = datetime.strptime(data.get("datetime"), "%Y-%m-%d %H:%M")
    start_dt = start_dt.strftime("%Y%m%d%H%M%S")
    location = data.get("location")
    cursor = db.cursor()
    try:
        sql = f"INSERT INTO `Task`(`initiator`, `num_connect`, `from`, `to`, `starttime`, `location`) VALUES ('{user}', 1, '{place_from}', '{place_to}', {start_dt}, '{location}');"
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
    data = json.loads(request.data.decode("utf-8"))
    user = data.get("user")
    cursor = db.cursor()
    try:
        sql = f"SELECT * FROM `User` INNER JOIN (`Relation`, `Task`) ON (User.username=Relation.username AND Relation.task_id=Task.id) WHERE User.username='{user}' ORDER BY Task.starttime DESC;"
        cursor.execute(sql)
        rec = cursor.fetchall()
        tasks = []
        for each in rec:
            task = dict()
            task["initiator"] = each[9]
            task["from"] = each[11]
            task["to"] = each[12]
            task["starttime"] = each[13].strftime("%Y/%m/%d %H:%M")
            task["location"] = each[14]
            tasks.append(task)
        response = make_response(json.dumps(tasks), 200)
    except Exception as e:
        response = make_response("Internal Error", 500)
        print(e)
    cursor.close()
    return response

@order.route('/getongoing', methods=["POST"])
@auth
def get_ongoing_order():
    data = json.loads(request.data.decode("utf-8"))
    user = data.get("user")
    cursor = db.cursor()
    try:
        sql = f"SELECT Task.id, Task.num_connect, Task.initiator, Task.from, Task.to, Task.starttime, Task.location FROM `User` INNER JOIN (`Relation`, `Task`) ON (User.username=Relation.username AND Relation.task_id=Task.id) WHERE User.username='{user}' AND Task.starttime > NOW() ORDER BY Task.starttime;"
        cursor.execute(sql)
        rec = cursor.fetchall()
        tasks = []
        for each in rec:
            task = dict()
            task["task_id"] = each[0]
            task["num_connect"] = each[1]
            task["initiator"] = each[2]
            task["from"] = each[3]
            task["to"] = each[4]
            task["starttime"] = each[5].strftime("%Y/%m/%d %H:%M")
            task["location"] = each[6]
            tasks.append(task)
        response = make_response(json.dumps(tasks), 200)
    except Exception as e:
        response = make_response("Internal Error", 500)
        print(e)
    cursor.close()
    return response

@order.route('/quit', methods=["POST"])
@auth
def quit_order():
    data = json.loads(request.data.decode('utf-8'))
    user = data.get('user')
    task_id = data.get('task_id')
    cursor = db.cursor()
    try:
        sql = f"DELETE FROM Relation WHERE Relation.username='{user}' AND Relation.task_id='{task_id}';"
        cursor.execute(sql)
        sql = f"UPDATE Task SET num_connect=num_connect-1 WHERE Task.id='{task_id}';"
        cursor.execute(sql)
        db.commit()
        response = make_response("success", 200)
    except Exception as e:
        db.rollback()
        response = make_response("Internal Error", 500)
        print(e)
    return response

@order.route('/getjoinable', methods=["POST"])
@auth
def get_joinable_order():
    data = json.loads(request.data.decode('utf-8'))
    user = data.get('user')
    cursor = db.cursor()
    try:
        sql = f"SELECT * FROM Task WHERE Task.starttime > NOW() AND Task.num_connect < 4 AND Task.id NOT IN (SELECT Task.id FROM User INNER JOIN (Relation, Task) WHERE User.username=Relation.username AND Relation.task_id=Task.id AND User.username='{user}');"
        cursor.execute(sql)
        rec = cursor.fetchall()
        tasks = []
        for each in rec:
            task = dict()
            task["task_id"] = each[0]
            task["initiator"] = each[1]
            task["num_connect"] = each[2]
            task["from"] = each[3]
            task["to"] = each[4]
            task["starttime"] = each[5].strftime("%Y/%m/%d %H:%M")
            task["location"] = each[6]
            tasks.append(task)
        response = make_response(json.dumps(tasks), 200)
    except Exception as e:
        response = make_response("Internal Error", 500)
        print(e)
    cursor.close()
    return response

@order.route('/join', methods=["POST"])
@auth
def join_order():
    data = json.loads(request.data.decode('utf-8'))
    user = data.get('user')
    task_id = data.get('task_id')
    cursor = db.cursor()
    try:
        sql = f"INSERT INTO Relation(username, task_id, status) VALUES ('{user}', {task_id}, 1);"
        cursor.execute(sql)
        sql = f"UPDATE Task SET num_connect=num_connect+1 WHERE id={task_id};"
        cursor.execute(sql)
        db.commit()
        response = make_response("success", 200)
    except Exception as e:
        db.rollback()
        response = make_response("Internal Error", 500)
        print(e)
    cursor.close()
    return response
