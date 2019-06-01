from flask import request, make_response
from common.redis_connector import get_redis
from functools import wraps
import json

def auth(handler):
    @wraps(handler)
    def wrapper(*args, **kwargs):
        data = json.loads(request.data.decode('utf-8'))
        token = data.get("token")
        user = data.get("user")
        if token is None:
            return make_response("no token", 401)
        redis = get_redis()
        if redis.get(token+':user') != user:
            return make_response("token expired", 401)
        return handler(*args, **kwargs)
    return wrapper
