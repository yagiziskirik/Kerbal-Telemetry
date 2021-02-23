import krpc
import time
import os

with open(os.path.join("static", "orbit.json"), "w") as f:
	f.write("{\"orbit\":0}");

isConn = False
while (isConn == False):
	try:
		conn = krpc.connect(name="Kerbal Telemetry")
		isConn = True
	except:
		pass

def dockAP():
	sc = conn.space_center
	mj = conn.mech_jeb
	active = sc.active_vessel
	print("Setting the first docking port as the controlling part")
	parts = active.parts
	parts.controlling = parts.docking_ports[0].part

	print("Looking for a free docking port attached to the target vessel")
	for dp in sc.target_vessel.parts.docking_ports:
		if not dp.docked_part:
			sc.target_docking_port = dp
			break

	print("Starting the docking process")
	docking = mj.docking_autopilot
	docking.enabled = True

	with conn.stream(getattr, docking, "enabled") as enabled:
		enabled.rate = 1 #we don't need a high throughput rate, 1 second is more than enough
		with enabled.condition:
			while enabled():
				enabled.wait()

	print("Docking complete!")

def rendezvouzAP():
	mj = conn.mech_jeb
	print("Planning Hohmann transfer")
	planner = mj.maneuver_planner
	hohmann = planner.operation_transfer
	hohmann.make_nodes()

	#check for warnings
	warning = hohmann.error_message
	if warning:
		print(warning)

	def execute_nodes():
    print("Executing maneuver nodes")
    executor.execute_all_nodes()
    
    with conn.stream(getattr, executor, "enabled") as enabled:
        enabled.rate = 1 #we don't need a high throughput rate, 1 second is more than enough
        with enabled.condition:
            while enabled():
                enabled.wait()

	print("Correcting course")
	fineTuneClosestApproach = planner.operation_course_correction
	fineTuneClosestApproach.intercept_distance = 50 #50 meters seems to be optimal distance; if you use 0, you can hit the target
	fineTuneClosestApproach.make_nodes()
	executor.tolerance = 0.01 #do a high-precision maneuver (0.01 dV tolerance)
	execute_nodes()

	print("Matching speed with the target")
	matchSpeed = planner.operation_kill_rel_vel
	matchSpeed.time_selector.time_reference = mj.TimeReference.closest_approach #match speed at the closest approach
	matchSpeed.make_nodes()
	executor.tolerance = 0.1 #return the precision back to normal
	execute_nodes()

	print("Rendezvous complete!")

def ascentAP():
	#All of these options will be filled directly into Ascent Guidance window and can be modified manually during flight.
	sc = conn.space_center
	mj = conn.mech_jeb
	ascent = mj.ascent_autopilot
	ascent.desired_orbit_altitude = 100000
	ascent.desired_inclination = 6

	ascent.force_roll = True
	ascent.vertical_roll = 90
	ascent.turn_roll = 90

	ascent.autostage = True

	ascent.ascent_path_index = 0 #use AscentClassic as the ascent path

	path = ascent.ascent_path_classic
	path.turn_shape_exponent = 0.5 #set the turn shape to 50%
	path.auto_path = False #don't use autopath
	path.turn_start_altitude = 3000
	path.turn_start_velocity = 120
	path.turn_end_altitude = 65000

	ascent.enabled = True
	sc.active_vessel.control.activate_next_stage() #launch the vessel

	with conn.stream(getattr, ascent, "enabled") as enabled:
		enabled.rate = 1 #we don't need a high throughput rate, 1 second is more than enough
		with enabled.condition:
			while enabled():
				enabled.wait()

	with open(os.path.join("static", "orbit.json"), "w") as f:
		f.write("{\"orbit\":1}");
	print("Launch complete!")

while True:
	ascend = os.path.exists("ascend.txt")
	if ascend:
		os.remove("ascend.txt")
		ascentAP()
	rendezvouz = os.path.exists("rendezvouz.txt")
	if rendezvouz:
		os.remove("rendezvouz.txt")
		rendezvouzAP()
	dock = os.path.exists("dock.txt")
	if dock:
		os.remove("dock.txt")
		dockAP()
	time.sleep(0.1)