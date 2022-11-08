# Kerbal Telemetry - Now Standalone!
![Version 2.4.0](https://img.shields.io/badge/version-2.3.0-blue) ![License](https://img.shields.io/badge/Licence-MIT-green) ![Maintenance](https://img.shields.io/maintenance/yes/2023) [![pages-build-deployment](https://github.com/yagiziskirik/Kerbal-Telemetry/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/yagiziskirik/Kerbal-Telemetry/actions/workflows/pages/pages-build-deployment) ![CKAN](https://img.shields.io/badge/CKAN-Indexed-green.svg)

Telemetry addon for Kerbal Space Program. The program uses a server that is running on the KSP side and a client which is capable of running both the KSP side computer or any other one over a web browser. This means you can connect to the server from any device which is capable of running it over a web browser by entering your server computer's local address and selected port from the interface (default 8000), for example: ```http://192.168.1.104:8000```.

![Intro](https://i.ibb.co/XC76347/logo.gif)

## Features
* Real-time sync with the KSP.
* Accessible over the LAN.
* Full-featured 3D Kerbin map with real pinpoints on it.
* Real-time attitude indicator.
* Target name, distance and speed.
* Real-time telemetry data.
* ~~Controlling the vessel from the interface.~~ (Will be fixed on oncoming updates)
* ~~Staging from the interface.~~ (Will be fixed on oncoming updates)
* Cool animation when you reach the orbit ~~(when executed from the interface)~~.
* Multi-language support (English, Russian, Japanese, Turkish, Ukrainian, Chinese, French, Spanish).
* General information about KSP, spaceship and many more.
* A brand new module to attach to the spacecraft.

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
* None!

## Setup
* Export files to GameData folder as a folder named "KerbalTelemetry".
* Done!

> Please be aware of that naming is quite important for mod to work correctly. Make sure you have `Kerbal Space Progam/GameData/KerbalTelemetry` folder and you need to have `KerbalTelemetry.dll`, `Textures`, `WebServer` and `Parts` files in KerbalTelemetry folder.

## Usage
![Engineering101](https://i.ibb.co/F0f8GKL/1.png)
* You need to unlock `Engineering 101` tech tree to use the mod in Career mode.
![Module](https://i.ibb.co/zJvm0Z4/2.jpg)
![Added](https://i.ibb.co/nCYpNM0/3.jpg)
* Then add Kerbal Telemetry Computer to your spacecraft.
![Usage](https://i.ibb.co/VmgZJFV/5.png)
* Click to the toolbar icon to open up user interface.
![Interface](https://i.ibb.co/df7m7mq/4.png)
* Select a port (or use default 8000) and start the server via the corresponding button.
* Connect to your computer's local IP address and defined port (or localhost if you are using the same computer) on your browser on your device preferably from another computer or from which KSP is installed (ex. localhost:8000 or 127.0.0.1:8000 or 192.168.1.102:8000). If you don't know how to find the local IP address, you can follow [this](https://www.whatismybrowser.com/detect/what-is-my-local-ip-address) link for more information.

On the top bar you can see:
* Spacecraft name.
* Mission time after the take-off.
* Speed.
* Altitude.
* Apogee.
* Perigee.
* Inclination.

On the first page (Spacecraft Information):
![Usage 1](https://i.ibb.co/LPh4nPM/Github-5.png)
* *External Values* page will show you the Location and Atmosphere information.
![Usage 2](https://i.ibb.co/McCS6rG/Github-4.png)
* *Orbit Information* page will show the orbit information.
![Usage 3](https://i.ibb.co/5vXvwN2/Github-3.png)
* *Spacecraft Information* page will show information about the spacecraft.
![Usage 4](https://i.ibb.co/3pcYVMq/Github-1.png)
* *Temperature Values* will give information about the temperature.

On the second page (Telemetry):
![Usage 5](https://i.ibb.co/5hW933G/Github-2.png)
* You can see the charts *after you take-off* to the point you reach *90km from the sea level (FL900)*.
* Also it shows some current values of the spacecraft.

On the third page (Command & Control):
![Usage 6](https://i.ibb.co/xFVXn6B/Github-6.png)
* You will see the extended details about the target.
* You can see the flight panel control panel.
* Flight Commands which ables you to command the spacecraft from the web interface.

On the final page (Settings):
![Usage 7](https://i.ibb.co/Gkh1RS2/Github-7.png)
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

Usage is very simple. Start the game. When you start a flight, activate telemetry plugin from toolbar. You will see the charts will refresh when you are airborne and below 90,000 meters.

## Special Thanks
I would like to thank [@MekoNix](https://github.com/MekoNix), [@Aebestach](https://github.com/Aebestach), [@Genhis](https://github.com/Genhis) and [@NguyenAirlines](https://www.curseforge.com/members/nguyenairlines) for their contribution and ideas.
