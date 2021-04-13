var globe;
var globeCount = 0;

function createGlobe() {
    var newData = [];
    globeCount++;
    $("#globe canvas").remove();
    if (false) {
        newData = data.slice();
    }

    globe = new ENCOM.Globe($('#globeContainer').width(), $('#globeContainer').height(), {
        font: "Segoe UI",
        data: newData, // copy the data array
        baseColor: "#ffcc00",
        markerColor: "#ffcc00",
        pinColor: "#8FD8D8",
        satelliteColor: "#ff0000",
        scale: 1.0,
        dayLength: 1000 * 28,
        pointsPerDegree: 1.1,
        pointSize: 0.6,
        introLinesDuration: 2000,
        maxPins: 500,
        maxMarkers: 4,
    });

    $("#globe").append(globe.domElement);
    globe.init(start);
}

function onWindowResize() {
    globe.camera.aspect = $('#globeContainer').width() / $('#globeContainer').height();
    globe.camera.updateProjectionMatrix();
    globe.renderer.setSize($('#globeContainer').width(), $('#globeContainer').height());

}

function roundNumber(num) {
    return Math.round(num * 100) / 100;
}

function projectionToLatLng(width, height, x, y) {

    return {
        lat: 90 - 180 * (y / height),
        lon: 360 * (x / width) - 180,
    };

}

function animate() {
    if (globe) {
        globe.tick();
    }
    requestAnimationFrame(animate);
}

function start() {

    if (globeCount == 0) { // only do this for the first globe that's created. very messy
        createGlobe();
        $(".projection").click(function (e) {
            var offset = $(this).offset();
            var latLon = projectionToLatLng($(".projection").width(), $(".projection").height(), e.clientX - offset.left, e.clientY - offset.top);

            var selectedId = $("#add-element .selected").attr("id");

            if (selectedId == "add-pin") {
                globe.addPin(latLon.lat, latLon.lon, "User Dropped Pin");
            } else if (selectedId == "add-marker") {
                globe.addMarker(latLon.lat, latLon.lon, "User Marker", true);
            } else if (selectedId == "add-satellite") {
                var opts = {
                    coreColor: $("#satellite-color").val(),
                    numWaves: parseInt($("#globe-si").val())
                };
                globe.addSatellite(latLon.lat, latLon.lon, parseFloat($("#globe-sa").val()), opts);
            }
        });

        $("#add-element li").click(function (e) {
            $("#add-element li").removeClass("selected");
            $(e.currentTarget).addClass("selected");
        });

        animate();

        /* add pins at random locations */
        setInterval(function () {
            if (!globe || !$("#globe-dd:checked").length) {
                return;
            }

            var lat = Math.random() * 180 - 90,
                lon = Math.random() * 360 - 180,
                name = "Test " + Math.floor(Math.random() * 100);

            globe.addPin(lat, lon, name);

        }, 1000);
    }

    /* add 6 satellites in random locations */

    if ($("#globe-dd:checked").length) {
        setTimeout(function () {
            var constellation = [];
            var opts = {
                coreColor: $("#satellite-color").val(),
                numWaves: parseInt($("#globe-si").val())
            };
            var alt = parseFloat($("#globe-sa").val());

            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 3; j++) {
                    constellation.push({
                        lat: 50 * i - 30 + 15 * Math.random(),
                        lon: 120 * j - 120 + 30 * i,
                        altitude: alt
                    });
                }
            }

            globe.addConstellation(constellation, opts);
        }, 4000);

        /* add the connected points that are in the movie */
        setTimeout(function () {
            //globe.addMarker(49.25, -123.1, "Vancouver");
            //globe.addMarker(35.6895, 129.69171, "Tokyo", true);
            globe.addMarker(0, 180, "AeroEquus EP");
            globe.addMarker(0, 0, "AeroEquus AP", true);
            globe.addMarker(0, -180, "AeroEquus EP", true);
        }, 2000);
    }

}
setTimeout(function () { start(); }, 3500);

function waypointAdder() {
    //globe.addMarker(0, 0, "Passion X EP");
    //globe.addMarker(0, 180, "Passion X AP", true);
    //globe.addMarker(0, 0 + 360, "Passion X EP", true);
    globe.addPin(-0.1025, -74.575278, "Kerbal Space Center");
    globe.addPin(-6.560278, -143.95, "Dessert Launch Site");
    globe.addPin(45.29, 136.11, "Woomerang Launch Site");
    globe.addPin(20.657222, -146.420556, "Inland Kerbal Space Center");
}

setTimeout(function () { waypointAdder(); }, 5000)