# Kerbal-Telemetry
![Version 2.2.0](https://img.shields.io/badge/version-2.2.0-blue) ![Licence](https://img.shields.io/badge/Licence-MIT-green) ![Maintenance](https://img.shields.io/maintenance/yes/2022)

Telemetry addon for Kerbal Space Program. The program uses a server that is running on the KSP side and a client which is capable of running both the KSP side computer or any other one over a web browser. This means you can connect to the server from any device which is capable of running it over a web browser by entering your server computer's local address and 5000 as the port, for example: ```http://192.168.1.104:5000```.

> This program requires lots of computing power. It is been advised to use this program with another computer or second screen.

![Intro](https://i.ibb.co/XC76347/logo.gif)

## Features
* Real-time sync with the KSP.
* Accessible over the LAN, from any device which is powerful enough.
* Full-featured 3D Kerbin map with real pinpoints on it.
* Real-time attitude indicator.
* Target name, distance and speed.
* Real-time telemetry data.
* Controlling the vessel from the interface.
* Staging from the interface.
* Cool animation when you reach the orbit (when executed from the interface).
* Multi-language support (English, Russian, Japanese, Turkish, Ukrainian, Chinese, French, Spanish).
* General information about KSP, spaceship and many more.

## Translations
If you see any problems or if you want to translate the program to your language, please contact me from my [Github](https://github.com/yagiziskirik) page.
* Russian - [MekoNix](https://github.com/MekoNix)
* Japanese - [MekoNix Team](https://github.com/MekoNix)
* Ukrainian - [MekoNix Team](https://github.com/MekoNix)
* Turkish - [yagiziskirik](https://github.com/yagiziskirik)
* English - [yagiziskirik](https://github.com/yagiziskirik)
* Chinese - Auto-translated
* French - Auto-translated
* Spanish - Auto-translated

## Dependencies
* Flask (for Python)<br>
> Note that the following dependencies are recommended to use controlling from the interface. You can use the program for monitoring only without installing the following dependencies (Stage Now, Start Ascend, Rendezvous With Target and Dock With Target buttons won't work):
* MechJeb (v2.9.1.0 for not having errors. Thanks to [Genhis](https://github.com/Genhis))
* kRPC
* kRPC MechJeb

## Setup
*You can find [@Grenzoocoon](https://www.curseforge.com/members/grenzoocoon)'s installation video from the [following link](https://www.youtube.com/watch?v=8u0Z4Brmbh4).*
* Export files to GameData folder.
* Install [Python 3.5](https://www.python.org/downloads/) or higher.
* Install [MechJeb](https://www.curseforge.com/kerbal/ksp-mods/mechjeb). *(Note: If you install the latest version of MechJeb, it gives some errors when you start KSP and start of a new flight, but it works just fine.)*
* Install [kRPC](https://krpc.github.io/krpc/getting-started.html).
* Install [kRPC MechJeb](https://genhis.github.io/KRPC.MechJeb/installation.html).
* Install Flask and kRPC dependencies for Python:
```sh
$ pip install Flask krpc
```
*Note: thanks to the [@Grenzoocoon](https://www.curseforge.com/members/grenzoocoon), setuptools no longer supports 2to3, so in order to fix it you can downgrade the setuptools to any version under 58.0.0 with the following command:*
```sh
$ pip install setuptools==57.5.0
```
* (Optional) Run *"Create Shortcut (Win)"* file to create a shortcut to the desktop.
* Run the KSP and start any save game (or start a new one).
* Open the kRPC menu and add a new server.
* Click on *Show advanced settings* and check *Auto-start server* and *Auto-accept new clients*.
Done!

## Usage
* Run server script (from the desktop shortcut or from the main file which includes *TelemetryServer.py*).
* On the first start, the program will ask you which language do you want to choose, refresh rate and chart refresh rate.
> Refresh rate is in how many milliseconds the program recycles data on the whole page.<br><br>
> And Chart refresh rate is in how many milliseconds the program recycles the telemetry graphics data (note that this data is created each second dependent on your computer's power).<br><br>
> If you wish to stick with the standard values, press enter to skip these two steps.
* Connect to your computer's local IP address and 5000 as the port (or localhost if you are using the same computer) on your browser on your device preferably from another computer or from which KSP is installed (ex. localhost:5000 or 127.0.0.1:5000 or 192.168.1.102:5000).

On the top bar you can see:
* Spacecraft name.
* Misson time after the take-off.
* Speed.
* Altitude.
* Apogee.
* Perigee.
* Inclination.

On the first page (Spacecraft Information):
* *External Values* page will show you the Location and Atmosphere information.
* *Orbit Information* page will show the orbit information.
* *Spacecraft Information* page will show information about the spacecraft.
* *Temperature Values* will give information about the temperature.

On the second page (Telemetry):
* You can see the charts *after you take-off* to the point you reach *90km from the sea level (FL900)*.
* Also it shows some current values of the spacecraft.

On the third page (Command & Control):
* You will see the extended details about the target.
* You can see the flight panel control panel.
* Flight Commands which ables you to command the spacecraft from the web interface.

On the final page (Settings):
* You can select the language of the interface.
* You can select refresh rate and chart refresh rate.

On the bottom bar:
* Current stage information.
* *Stage Now* button which initiates the next stage.
* Current planet.
* Current real-time.
* Whether you have communication.
* Initials of the target.
* Target speed / target distance.

![Usage 1](https://i.ibb.co/LPh4nPM/Github-5.png)
> First page that Kerbal Telemetry welcomes you.

![Usage 2](https://i.ibb.co/McCS6rG/Github-4.png)
> Orbit Information page.

![Usage 3](https://i.ibb.co/5vXvwN2/Github-3.png)
> Spacecraft Information page.

![Usage 4](https://i.ibb.co/3pcYVMq/Github-1.png)
> Temperature Values page.

![Usage 5](https://i.ibb.co/5hW933G/Github-2.png)
> Charts page.

![Usage 6](https://i.ibb.co/xFVXn6B/Github-6.png)
> Control Center page.

![Usage 7](https://i.ibb.co/Gkh1RS2/Github-7.png)
> Settings page.

Usage is very simple. After you run the server script, start the game. When you start a flight, the telemetry plugin will become active. You will see the charts will refresh when you are airborne and below 90,000 meters.

## Special Thanks
I would like to thank [@MekoNix](https://github.com/MekoNix), [@Aebestach](https://github.com/Aebestach), [@Genhis](https://github.com/Genhis) and [@NguyenAirlines](https://www.curseforge.com/members/nguyenairlines) for their contribution and ideas.
