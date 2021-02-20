from flask import Flask, render_template, json
import os
import subprocess
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/altOverTime")
def altOverTime():
	filename = os.path.join(app.static_folder, 'altOverTime.json')

	with open(filename) as file:
		data = json.load(file)

	return data

@app.route("/fPOverTime")
def fPOverTime():
	filename = os.path.join(app.static_folder, 'fPOverTimeData.json')

	with open(filename) as file:
		data = json.load(file)

	return data

@app.route("/apogeeOverTime")
def apogeeOverTime():
	filename = os.path.join(app.static_folder, 'apogeeOverTimeData.json')

	with open(filename) as file:
		data = json.load(file)

	return data

@app.route("/velOverTime")
def velOverTime():
	filename = os.path.join(app.static_folder, 'velOverTimeData.json')

	with open(filename) as file:
		data = json.load(file)

	return data

@app.route("/dVOverTime")
def dVOverTime():
	filename = os.path.join(app.static_folder, 'dVOverTimeData.json')

	with open(filename) as file:
		data = json.load(file)

	return data

@app.route('/live')
def liveUpdate():
	filename = os.path.join(app.static_folder, 'data.json')

	with open(filename) as file:
		data = json.load(file)

	return data

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0")