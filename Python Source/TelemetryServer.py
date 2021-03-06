from flask import Flask, render_template, json, request
import os
import settings
import subprocess

if os.path.exists("firststart.cfg") == False:
	settings.langChooser()

app = Flask(__name__)

subprocess.Popen("python stager.py")
subprocess.Popen("python kerbalkRPC.py")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/stage")
def stage():
	with open("stage.txt", "w") as f:
		f.write("0")
	return "Stage Successful"

@app.route("/sendValues")
def sendValues():
	language = request.args.get("language")
	chartsRate = request.args.get("chartsRate")
	refreshRate = request.args.get("refreshRate")
	print(language)
	print(chartsRate)
	print(refreshRate)
	filename = os.path.join(app.static_folder, 'refreshRate.json')
	writing = "{\"refreshRate\":"+refreshRate+", \"chartsRate\": "+chartsRate+", \"lang\": \""+language+"\"}"
	with open(filename, "w") as f:
		f.write(writing)

@app.route("/ascend")
def ascend():
	with open("ascend.txt", "w") as f:
		f.write("0")
	return "Ascend Initiated"

@app.route("/dock")
def dock():
	with open("dock.txt", "w") as f:
		f.write("0")
	return "Dock Initiated"

@app.route("/rendezvouz")
def rendezvouz():
	with open("rendezvouz.txt", "w") as f:
		f.write("0")
	return "Rendezvouz Initiated"

@app.route("/refreshRate")
def refreshRates():
	filename = os.path.join(app.static_folder, 'refreshRate.json')

	with open(filename, encoding="utf8", errors="surrogateescape") as file:
		data = file.read()

	return data

@app.route("/orbit")
def orbitChecker():
	filename = os.path.join(app.static_folder, 'orbit.json')

	with open(filename, encoding="utf8", errors="surrogateescape") as file:
		data = file.read()

	return data

@app.route("/altOverTime")
def altOverTime():
	filename = os.path.join(app.static_folder, 'altOverTime.json')

	with open(filename, encoding="utf8", errors="surrogateescape") as file:
		data = file.read()

	return data

@app.route("/fPOverTime")
def fPOverTime():
	filename = os.path.join(app.static_folder, 'fPOverTimeData.json')

	with open(filename, encoding="utf8", errors="surrogateescape") as file:
		data = file.read()

	return data

@app.route("/apogeeOverTime")
def apogeeOverTime():
	filename = os.path.join(app.static_folder, 'apogeeOverTimeData.json')

	with open(filename, encoding="utf8", errors="surrogateescape") as file:
		data = file.read()

	return data

@app.route("/velOverTime")
def velOverTime():
	filename = os.path.join(app.static_folder, 'velOverTimeData.json')

	with open(filename, encoding="utf8", errors="surrogateescape") as file:
		data = file.read()

	return data

@app.route("/dVOverTime")
def dVOverTime():
	filename = os.path.join(app.static_folder, 'dVOverTimeData.json')

	with open(filename, encoding="utf8", errors="surrogateescape") as file:
		data = file.read()

	return data

@app.route('/live')
def liveUpdate():
	filename = os.path.join(app.static_folder, 'data.json')

	with open(filename, encoding="utf8", errors="surrogateescape") as file:
		data = file.read()


	return data

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0")