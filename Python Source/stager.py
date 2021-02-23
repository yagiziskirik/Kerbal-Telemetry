import krpc
import time
import os

isConn = False
while (isConn == False):
	try:
		conn = krpc.connect(name="Kerbal Telemetry Stager")
		isConn = True
	except:
		pass

while True:
	path = os.path.exists("stage.txt")
	if path:
		os.remove("stage.txt")
		vessel = conn.space_center.active_vessel
		vessel.control.activate_next_stage()
	time.sleep(0.1)