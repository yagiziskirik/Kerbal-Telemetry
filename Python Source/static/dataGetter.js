var orbit = false;
var refreshRate = 100;
var chartsRate = 1000;
var lang = "en";

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 9 ? h : "0" + h;
    var mDisplay = m > 9 ? m : "0" + m;
    var sDisplay = s > 9 ? s : "0" + s;
    return hDisplay + ":" + mDisplay + ":" + sDisplay;
}

function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + String.fromCharCode(176) + " " + minutes + "' " + seconds + "''";
}

function convertDMSLat(lat) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    return latitude + " " + latitudeCardinal;
}

function convertDMSLon(lng) {
    var longitude = toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? "E" : "W";

    return longitude + " " + longitudeCardinal;
}

function refreshRates() {
    $.ajax({
        type: "Get",
        url: "/refreshRate",
        dataType: "json",
        success: function (data) {
            refreshRate = data.refreshRate;
            chartsRate = data.chartsRate;
            if (lang == data.lang) {
                lang = data.lang;
            } else {
                lang = data.lang;
                translate(lang);
            }
        }
    });
}

refreshRates();

function updateAltOverTime() {
    $.ajax({
        type: "Get",
        url: "/altOverTime",
        dataType: "json",
        success: function (data) {
            var a = data.data;
            var labels = [];
            for (var i = 0; i < a.length; i++) {
                labels.push("");
            }
            altTimeChart.data.labels = labels;
            altTimeChart.data.datasets[0].data = a;
            altTimeChart.update();
        }
    });
}

function updateApogeeOverTime() {
    $.ajax({
        type: "Get",
        url: "/apogeeOverTime",
        dataType: "json",
        success: function (data) {
            var a = data.data;
            var labels = [];
            for (var i = 0; i < a.length; i++) {
                labels.push("");
            }
            apTimeChart.data.labels = labels;
            apTimeChart.data.datasets[0].data = a;
            apTimeChart.update();
        }
    });
}

function updateVelOverTime() {
    $.ajax({
        type: "Get",
        url: "/velOverTime",
        dataType: "json",
        success: function (data) {
            var a = data.data;
            var labels = [];
            for (var i = 0; i < a.length; i++) {
                labels.push("");
            }
            velTimeChart.data.labels = labels;
            velTimeChart.data.datasets[0].data = a;
            velTimeChart.update();
        }
    });
}

function updatedVOverTime() {
    $.ajax({
        type: "Get",
        url: "/dVOverTime",
        dataType: "json",
        success: function (data) {
            var a = data.data;
            var labels = [];
            for (var i = 0; i < a.length; i++) {
                labels.push("");
            }
            dvTimeChart.data.labels = labels;
            dvTimeChart.data.datasets[0].data = a;
            dvTimeChart.update();
        }
    });
}

function updatefPOverTime() {
    $.ajax({
        type: "Get",
        url: "/fPOverTime",
        dataType: "json",
        success: function (data) {
            var a = data.data;
            var labels = [];
            for (var i = 0; i < a.length; i++) {
                labels.push("");
            }
            flightProfileChart.data.labels = labels;
            flightProfileChart.data.datasets[0].data = a;
            flightProfileChart.update();
        }
    });
}

function checkOrbit() {
    $.ajax({
        type: "Get",
        url: "/orbit",
        dataType: "json",
        success: function (data) {
            var a = data.orbit;
            if (a == 1 && orbit == false) {
                orbit = true;
                var name = document.getElementById("nameVar").innerText;
                globe.addMarker(0, 0, name + " EP");
                globe.addMarker(0, 180, name + " AP", true);
                globe.addMarker(0, 0 + 360, name + " EP", true);
            }
        }
    });
}

function updateData() {
    $.ajax({
        type: "Get",
        url: "/live",
        dataType: "json",
        success: function (data) {
            document.getElementById("altVar").innerText = (data.altitude / 1000).toFixed(1) + "km";
            altGauge.setValueAnimated(data.altitude / 1000);
            spdGauge.setValueAnimated(data.speed);
            accGauge.setValueAnimated(data.acceleration);
            machNumb = (data.speed / 1225.044).toFixed(2);
            document.getElementById("mach").innerText = machNumb + "M";
            document.getElementById("altVar2").innerText = (data.altitude / 1000).toFixed(1) + "km";
            document.getElementById("distTravVar").innerText = (data.distanceTraveled / 1000).toFixed(1) + "km";
            document.getElementById("tempVar").innerText = data.externalTemperature.toFixed(2) + String.fromCharCode(176) + "C";
            document.getElementById("tempVar2").innerText = data.externalTemperature.toFixed(2) + String.fromCharCode(176) + "C";
            document.getElementById("gForceVar").innerText = data.GForce.toFixed(2) + "g";
            document.getElementById("isComm").innerText = data.canComm;
            document.getElementById("situationVar").innerText = data.situation;
            document.getElementById("latVar").innerText = convertDMSLat(data.lat);
            document.getElementById("longVar").innerText = convertDMSLon(data.lon);
            document.getElementById("latVar2").innerText = convertDMSLat(data.lat);
            document.getElementById("longVar2").innerText = convertDMSLon(data.lon);
            document.getElementById("vertSpeed").innerText = data.verticalSpeed.toFixed(2) + "m/s";
            document.getElementById("rollVar").innerText = (data.roll).toFixed(1) + String.fromCharCode(176);
            document.getElementById("pitchVar").innerText = (data.pitch).toFixed(1) + String.fromCharCode(176);
            document.getElementById("yawVar").innerText = (data.yaw).toFixed(1) + String.fromCharCode(176);

            document.getElementById("coolTemp").innerText = (data.coolTemp).toFixed(0) + String.fromCharCode(176) + "C";
            document.getElementById("coolSkinTemp").innerText = (data.coolSkinTemp).toFixed(0) + String.fromCharCode(176) + "C";
            document.getElementById("coolSkinName").innerText = data.coolSkinName;
            document.getElementById("hotTemp").innerText = (data.hotTemp).toFixed(0) + String.fromCharCode(176) + "C";
            document.getElementById("hotSkinTemp").innerText = (data.hotSkinTemp).toFixed(0) + String.fromCharCode(176) + "C";
            document.getElementById("hotSkinName").innerText = data.hotSkinName;
            document.getElementById("critTemp").innerText = (data.critTemp).toFixed(0) + String.fromCharCode(176) + "C";
            document.getElementById("critSkinTemp").innerText = (data.critSkinTemp).toFixed(0) + String.fromCharCode(176) + "C";
            document.getElementById("critSkinName").innerText = data.critSkinName;
            cube.rotation.y = (data.yaw / 360 - 0.75) * Math.PI * 2;
            cube.rotation.x = (data.pitch / 360) * Math.PI * 2;
            camera.rotation.z = (-data.roll / 360) * Math.PI * 2;

            var missionTimer = secondsToHms(data.missionTime.toFixed());
            document.getElementById("timeVar").innerText = "T+" + missionTimer;
            document.getElementById("speedVar").innerText = (data.speed / 1000).toFixed(2) + "km/s";
            document.getElementById("nameVar").innerText = data.name;
            document.getElementById("nameVar2").innerText = data.name;
            document.getElementById("atmDenVar").innerHTML = data.atmDensity.toFixed(5) + "kg/m<sup>3</sup>";
            document.getElementById("currentStage").innerText = data.currentStage;
            document.getElementById("deltaVVar").innerText = (data.deltaV).toFixed(1) + "m/s";
            document.getElementById("planet").innerText = data.planetName;
            document.getElementById("deltaVVar2").innerText = (data.deltaV).toFixed(1) + "m/s";
            document.getElementById("accVar").innerHTML = (data.acceleration).toFixed(1) + "m/s<sup>2</sup>";
            document.getElementById("horizSpeed").innerText = (data.horizSpeed).toFixed(2) + "m/s";
            var name = data.targetName;
            document.getElementById("targetValues").innerText = (data.targetSpeed).toFixed(1) + "/" + (data.distance).toFixed(0);
            document.getElementById("convFlux").innerText = (data.convFlux).toFixed(1);
            document.getElementById("radFlux").innerText = (data.radFlux).toFixed(1);
            document.getElementById("intFlux").innerText = (data.intFlux).toFixed(1);
            document.getElementById("partCountVar").innerText = data.partCount;
            document.getElementById("massVar").innerText = (data.mass).toFixed(1) + "t";
            var timeAp = secondsToHms(data.timeToAp.toFixed());
            var timePe = secondsToHms(data.timeToPe.toFixed());
            document.getElementById("timeToPe").innerText = timePe;
            document.getElementById("timeToAp").innerText = timeAp;
            document.getElementById("inclVar").innerText = data.orbitIncl.toFixed(2) + String.fromCharCode(176);
            document.getElementById("inclVar2").innerText = data.orbitIncl.toFixed(2) + String.fromCharCode(176);
            document.getElementById("eccVar").innerText = data.orbitEcc.toFixed(2);
            document.getElementById("apVar").innerText = (data.ApA / 1000).toFixed(1) + "km";
            document.getElementById("apHeightVar").innerText = (data.ApA / 1000).toFixed(1) + "km";
            document.getElementById("peVar").innerText = (data.PeA / 1000).toFixed(1) + "km";
            document.getElementById("peHeightVar").innerText = (data.PeA / 1000).toFixed(1) + "km";
            document.getElementById("targetName2").innerText = data.targetName;
            document.getElementById("targetLat").innerText = convertDMSLat(data.targetLat);
            document.getElementById("targetLong").innerText = convertDMSLon(data.targetLong);
            document.getElementById("targetDistance").innerText = (data.distance).toFixed(1) + "m";
            document.getElementById("relSpeed").innerText = (data.targetSpeed).toFixed(1) + "m/s";
            if (name == "NON") {
                document.getElementById("targetName").innerText = name;
            }
            else {
                var rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

                var initials = [...name.matchAll(rgx)] || [];

                initials = (
                    (initials.shift() ?.[1] || '') + (initials.pop() ?.[1] || '')
                ).toUpperCase();
                document.getElementById("targetName").innerText = initials;
            }
        }
    });
    setTimeout(updateData, refreshRate);
}

function updateCharts() {
    updateAltOverTime();
    updateApogeeOverTime();
    updateVelOverTime();
    updatedVOverTime();
    updatefPOverTime();
    checkOrbit()
    setTimeout(updateCharts, chartsRate);
}

setTimeout(function () { updateCharts(); }, 4000);
setTimeout(function () { updateData(); }, 4000);