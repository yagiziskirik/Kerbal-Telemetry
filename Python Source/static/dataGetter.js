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

function updateData() {
    $.ajax({
        type: "Get",
        url: "/live",
        dataType: "json",
        success: function (data) {
            document.getElementById("alt").innerText = data.altitude.toFixed(2);
            document.getElementById("dist").innerText = data.distanceTraveled.toFixed(2);
            document.getElementById("temp").innerText = data.externalTemperature.toFixed(2);
            document.getElementById("gforce").innerText = data.GForce.toFixed(2);
            document.getElementById("canComm").innerText = data.canComm;
            document.getElementById("landed").innerText = data.isLanded;
            document.getElementById("lat").innerText = data.lat.toFixed(4);
            document.getElementById("lon").innerText = data.lon.toFixed(4);
            document.getElementById("verticalSpeed").innerText = data.verticalSpeed.toFixed(2);
            var missionTimer = secondsToHms(data.missionTime.toFixed());
            document.getElementById("missiont").innerText = missionTimer;
            document.getElementById("speed").innerText = data.speed.toFixed(2);
            document.getElementById("name").innerText = data.name;
            document.getElementById("atmDens").innerText = data.atmDensity.toFixed(5);
            document.getElementById("currentStage").innerText = data.currentStage;
            document.getElementById("deltaV").innerText = data.deltaV.toFixed(2);
            var timeAp = secondsToHms(data.timeToAp.toFixed());
            var timePe = secondsToHms(data.timeToPe.toFixed());
            document.getElementById("timeToPe").innerText = timePe;
            document.getElementById("timeToAp").innerText = timeAp;
            document.getElementById("orbitSpeed").innerText = data.orbitSpeed.toFixed(2);
            document.getElementById("orbitIncl").innerText = data.orbitIncl.toFixed(3);
            document.getElementById("orbitEcc").innerText = data.orbitEcc.toFixed(3);
            document.getElementById("ApA").innerText = data.ApA.toFixed(2);
            document.getElementById("PeA").innerText = data.PeA.toFixed(2);
        }
    });
    setTimeout(updateData, 100);
}

updateData();