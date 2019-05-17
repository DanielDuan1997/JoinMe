from flask import Flask
from flask_cors import CORS

from routes.user import user as user_blueprint
from routes.order import order as order_blueprint

app = Flask(__name__)
app.register_blueprint(user_blueprint)
app.register_blueprint(order_blueprint)
CORS(app, supports_credentials=True, resources=r'/*')

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
