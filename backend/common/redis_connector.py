import redis

def get_redis(host='localhost', port=6379):
    pool = redis.ConnectionPool(host=host, port=port, decode_responses=True)
    return redis.Redis(connection_pool=pool)
