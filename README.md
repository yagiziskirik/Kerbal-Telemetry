# Kerbal-Telemetry
![Version 2.1.0](https://img.shields.io/badge/version-2.1.0-blue) ![Licence](https://img.shields.io/badge/Licence-MIT-green) ![Maintenance](https://img.shields.io/maintenance/yes/2021)

Telemetry addon for Kerbal Space Program. Program uses a server which is running on the KSP side and a client which is capable of running both the KSP side computer or any other one over a web browser. This means you can connect to the server from any device which is capable of running it over a web browser with entering your server computer's local address and 5000 as port, for example: ```http://192.168.1.104:5000```.

> This program requires lots of computing power. It is been advised to use this program with another computer or second screen.

![Intro](https://i.ibb.co/XC76347/logo.gif)

## Features
* Real-time sync with the KSP.
* Accessible over the LAN, from any device.
* Full-featured 3D Kerbin map with real pinpoints on it.
* Real-time attitude indicator.
* Target name, distance and speed.
* Real-time telemetry data.
* Controlling the vessel from the interface.
* Staging from the interface.
* Cool animation when you reach the orbit (when executed from the interface).
* General information and many more.

## Dependencies
* MechJeb (v2.9.2.0. Thanks to [Genhis](https://github.com/Genhis))
* kRPC
* kRPC MechJeb

## Setup
* Export files to KSP main folder.
* Install [Python 3.5](https://www.python.org/downloads/) or higher (v3.8.0 recommended).
* Install [MechJeb](https://www.curseforge.com/kerbal/ksp-mods/mechjeb).
* Install [kRPC](https://krpc.github.io/krpc/getting-started.html). *(Note: If you install the latest version of kRPC, it gives some errors when you start KSP and start of a new flight, but it works just fine.)*
* Install [kRPC MechJeb](https://genhis.github.io/KRPC.MechJeb/installation.html).
* Install Flask and kRPC dependencies:
```sh
$ pip install Flask
$ pip install krpc
```
* (Optional) Run *"Create Shortcut (Win)"* file to create a shortcut to desktop.
* Run the KSP and start any save game (or start new one).
* Open kRPC menu and add new server.
* Click on *Show advanced settings* and check *Auto-start server* and *Auto-accept new clients*.
Done!

> Note: If web interface is not updating and showing the static values while you are in flight, indicates that system is not working properly. To fix that, move the KerbalTelemetry folder inside GameData folder. Skip this step if program works well. (Thanks to [@NguyenAirlines](https://www.curseforge.com/members/nguyenairlines "@NguyenAirlines"))

## Usage
* Run server script (from your desktop or from the main file which includes *TelemetryServer.py*).
* Connect to your computer's local IP address (or localhost if you are using the same computer) on your browser on your device preferably from another computer or from which KSP is installed.

On the top bar you can see:
* Spacecraft name.
* Misson time after the take-off.
* Speed.
* Altitude.
* Apogee.
* Perigee.
* Inclination.

On the first page:
* *External Values* page will show you the Location and Atmosphere information.
* *Orbit Information* page will show the orbit information.
* *Spacecraft Information* page will show information about the spacecraft.
* *Temperature Values* will give information about the temperature.

On the second page:
* You can see the charts *after you take-off* to the point you reach *90km from the sea level (FL900)*.
* Also it shows some current values of the spacecraft.

On the final page:
* You will see the extended details about the target.
* You can see the flight panel control panel.
* Flight Commands which ables you to command the spacecraft from the web interface.

On the bottom bar:
* Current stage information.
* *Stage Now* button which initiates the next stage.
* Current planet.
* Current real time.
* Whether you have communication.
* Initials of the target.
* Target speed / target distance.

![Usage 1](https://i.ibb.co/qDsvg93/1.jpg)
> First page that Kerbal Telemetry welcomes you.

![Usage 2](https://i.ibb.co/4SkJb0p/2.jpg)
> Orbit Information page.

![Usage 3](https://i.ibb.co/fYmKH2Y/3.jpg)
> Spacecraft Information page.

![Usage 4](https://i.ibb.co/Fqq1fGR/4.jpg)
> Temperature Values page.

![Usage 5](https://i.ibb.co/QXCSgJV/chart.jpg)
> Charts page.

![Usage 6](https://i.ibb.co/4ffdx7k/cp.jpg)
> Control Center page.

Usage is very simple. After you run the server script, start the game. When you start a flight, telemetry plugin will become active.

## Known Problems
* If you execute staging or maneouvres from the interface when you are not in flight, maneouvres stop working until you restart the Telemetry Server again.
* Chinese characters are not supported on the web interface.
