import pymysql

def open_db(host="localhost", user="root", password="niabbf"):
    db = pymysql.connect(host, user, password, "JoinMe")
    return db

def close_db(db):
    db.cursor().close()
    db.close()
