from flask import Flask, render_template, json
import os

app = Flask(__name__)

@app.route('/')
def index():
   return render_template("telemetry.html", symbol="°")

@app.route('/live')
def liveUpdate():
	filename = os.path.join(app.static_folder, 'data.json')

	with open(filename) as file:
		data = json.load(file)

	return data

if __name__ == '__main__':
   app.run(host="0.0.0.0", port="5000")