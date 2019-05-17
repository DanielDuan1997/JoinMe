from flask import Blueprint
from flask import request

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
    sql = f"INSERT INTO `Task`(`initiator`, `num_connect`, `from`, `to`, `starttime`) VALUES ({user}, 1, '{place_from}', '{place_to}', {start_dt});"
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
