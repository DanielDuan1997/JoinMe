from flask import Flask, session

app = Flask(__name__)
app.config["SECRET_KEY"] = "Daniel"

@app.route('/login')
def login():
    session["name"] = 'python'
    session["mobile"] = '18933324106'
    return 'login success'

@app.route('/index')
def index():
    name = session.get("name")
    return f"Hello {name}"

if __name__ == '__main__':
    app.run(debug=True)