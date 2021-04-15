var selectedPage = 0;
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function checkTime() {
    var d = new Date();
    var x = document.getElementById("realTime");
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    x.innerText = h + ":" + m;
    setTimeout(checkTime, 1000);
}

setTimeout(function () { checkTime(); }, 4000);

function createMesh(geom, imageFile) {
    var texture = THREE.ImageUtils.loadTexture("/static/" + imageFile)
    var mat = new THREE.MeshPhongMaterial();
    mat.map = texture;

    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500);
var bgcolor = new THREE.Color(0x15161B);
renderer.setClearColor(bgcolor);
document.getElementById("att").appendChild(renderer.domElement);

var loader = new THREE.TextureLoader();
var texture = THREE.ImageUtils.loadTexture("/static/attitude.png")
var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
var material = new THREE.MeshBasicMaterial({
    overdraw: 0.1
});
material.map = texture;
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.rotation.y = 0.75 * Math.PI * 2;

camera.position.z = 7.5;
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    renderer.setSize($('.attitude').width(), $('.attitude').height());
};

setTimeout(function () { render(); }, 4000);

function alignHighligh() {
    var $this = $('.selectionIndicator');
    var selector = $('.highlight');
    var selectorWidth = selector.width();
    var offset = $this.offset();
    var width = $this.width();
    var centerX = offset.left + width / 2;
    var exactPlace = centerX - selectorWidth / 2;
    selector.css('left', exactPlace);
}

function alignIndicators() {
    var mainframe = $('.main-frame');
    var $this = $('#main-frame-image');
    var acceleration = $('.acceleration');
    var alt = $('.altitude');
    var att = $('.attitude');
    var speed = $('.speed');
    var width = $this.width() + 2;
    var mfWidth = mainframe.width();
    var diff = (mfWidth - width) / 2;
    acceleration.css('left', diff + 15 + (screen.width / 100) * 2);
    alt.css('right', diff + 15 + (screen.width / 100) * 2);
    att.css('left', diff + 15 + (screen.width / 100) * 2);
    speed.css('right', diff + 15 + (screen.width / 100) * 2);
}

function alignTexts() {
    var mainframe = $('.main-frame');
    var $this = $('#main-frame-image');
    var deltav = $('.deltav');
    var pitch = $('.pitch');
    var roll = $('.roll');
    var rollWidth = roll.width();
    var yaw = $('.yaw');
    var yawWidth = roll.width();
    var width = $this.width() + 2;
    var mfWidth = mainframe.width();
    var diff = (mfWidth - width) / 2;
    roll.css('left', diff + 15 + (width / 2) - (rollWidth / 2) + 2);
    yaw.css('left', diff + 15 + (width / 2) - (yawWidth / 2) + 2);
    var rollYawDiff = yaw.offset().top - roll.offset().top;
    deltav.css('left', diff + 7.5 + (width - rollYawDiff) / 2);
    pitch.css('left', diff + (width - rollYawDiff) / 2 + rollYawDiff);
}

var accGauge = Gauge(
    document.getElementById("acc"),
    {
        max: 25,
        dialStartAngle: 90,
        dialEndAngle: -45,
        radius: 10,
        label: function (value) {
            return value.toFixed(2) + "g";
        },
        color: function (value) {
            return "#20FBFD";
        },
        value: 0.00,
        labelsub: "ACCELERATION"
    });

var altGauge = Gauge(
    document.getElementById("alt"),
    {
        max: 1000,
        dialStartAngle: 90,
        dialEndAngle: -45,
        radius: 10,
        label: function (value) {
            return value.toFixed(1) + "km";
        },
        color: function (value) {
            return "#20FBFD";
        },
        value: 0.0,
        labelsub: "ALTITUDE"
    });

var spdGauge = Gauge(
    document.getElementById("spd"),
    {
        max: 8000,
        dialStartAngle: 90,
        dialEndAngle: -45,
        radius: 10,
        label: function (value) {
            return value.toFixed(1) + "m/s";
        },
        color: function (value) {
            return "#20FBFD";
        },
        value: 0.0,
        labelsub: "SPEED"
    });

setTimeout(function () { document.getElementsByTagName("text")[4].innerHTML = "SPEED"; }, 5000);

function addZerosForImage(numb) {
    if (numb < 10) {
        return "0" + "0" + numb;
    } else if (numb < 100) {
        return "0" + numb;
    } else {
        return numb;
    }
}

function displayIntro() {
    $('.intro').html('<img class="intro-img" src="/static/logo.gif"/>');
    setTimeout(function () { $('.intro').addClass('done'); }, 3500);
}

$(document).ready(function () {
    alignHighligh();
    displayIntro();
    //setTimeout(function () { $('.intro').addClass('done'); }, 2000);
    $('.custom-carousel').slick({
        //arrows: false
        arrows: false,
        draggable: false,
        swipe: false,
        speed: 100
    });
    $('.fa-arrow-left').click(function () {
        $('.custom-carousel').slick('slickPrev');
        selectedPage -= 1;
        if (selectedPage == 1) {
            $('.pageChanger').css('border-color', '#15161B');
            $('.subset').css('opacity', 0);
            $('#pageChanger2').css('border-color', '#FFFFFF');
            $('#pageChanger2 .subset').css('opacity', 1);
            $('#selectedTitle').text('Orbit Information');
            if (lang == "en") {
                $('#selectedTitle').text('Orbit Information');
            } else if (lang == "tr") {
                $('#selectedTitle').text('Yörünge Bilgisi');
            } else if (lang == "ru") {
                $('#selectedTitle').text('Информация об орбите');
            } else if (lang == "zh") {
                $('#selectedTitle').text('轨道信息');
            } else if (lang == "fr") {
                $('#selectedTitle').text('Informations sur l\'orbite');
            } else if (lang == "es") {
                $('#selectedTitle').text('Información de órbita');
            }
        }
        else if (selectedPage == 2) {
            $('.pageChanger').css('border-color', '#15161B');
            $('.subset').css('opacity', 0);
            $('#pageChanger3').css('border-color', '#FFFFFF');
            $('#pageChanger3 .subset').css('opacity', 1);
            $('#selectedTitle').text('Spacecraft Information');
            if (lang == "en") {
                $('#selectedTitle').text('Spacecraft Information');
            } else if (lang == "tr") {
                $('#selectedTitle').text('Uzay Aracı Bilgisi');
            } else if (lang == "ru") {
                $('#selectedTitle').text('Информация о космическом корабле');
            } else if (lang == "zh") {
                $('#selectedTitle').text('航天器信息');
            } else if (lang == "fr") {
                $('#selectedTitle').text('Informations sur l\'engin spatial');
            } else if (lang == "es") {
                $('#selectedTitle').text('Información de la nave espacial');
            }
        }
        else if (selectedPage == 0) {
            $('.pageChanger').css('border-color', '#15161B');
            $('.subset').css('opacity', 0);
            $('#pageChanger1').css('border-color', '#FFFFFF');
            $('#pageChanger1 .subset').css('opacity', 1);
            $('#selectedTitle').text('External Values');
            if (lang == "en") {
                $('#selectedTitle').text('External Values');
            } else if (lang == "tr") {
                $('#selectedTitle').text('Dış Değerler');
            } else if (lang == "ru") {
                $('#selectedTitle').text('Внешние значения');
            } else if (lang == "zh") {
                $('#selectedTitle').text('外部价值');
            } else if (lang == "fr") {
                $('#selectedTitle').text('Valeurs externes');
            } else if (lang == "es") {
                $('#selectedTitle').text('Valores externos');
            }
        }
        else {
            selectedPage = 3;
            $('.pageChanger').css('border-color', '#15161B');
            $('.subset').css('opacity', 0);
            $('#pageChanger4').css('border-color', '#FFFFFF');
            $('#pageChanger4 .subset').css('opacity', 1);
            $('#selectedTitle').text('Temperature Values');
            if (lang == "en") {
                $('#selectedTitle').text('Temperature Values');
            } else if (lang == "tr") {
                $('#selectedTitle').text('Sıcaklık Değerleri');
            } else if (lang == "ru") {
                $('#selectedTitle').text('Значения температуры');
            } else if (lang == "zh") {
                $('#selectedTitle').text('温度值');
            } else if (lang == "fr") {
                $('#selectedTitle').text('Valeurs de température');
            } else if (lang == "es") {
                $('#selectedTitle').text('Valores de temperatura');
            }
        }
    });
    $('.fa-arrow-right').click(function () {
        $('.custom-carousel').slick('slickNext');
        selectedPage += 1;
        if (selectedPage == 1) {
            $('.pageChanger').css('border-color', '#15161B');
            $('.subset').css('opacity', 0);
            $('#pageChanger2').css('border-color', '#FFFFFF');
            $('#pageChanger2 .subset').css('opacity', 1);
            $('#selectedTitle').text('Orbit Information');
            if (lang == "en") {
                $('#selectedTitle').text('Orbit Information');
            } else if (lang == "tr") {
                $('#selectedTitle').text('Yörünge Bilgisi');
            } else if (lang == "ru") {
                $('#selectedTitle').text('Информация об орбите');
            } else if (lang == "zh") {
                $('#selectedTitle').text('轨道信息');
            } else if (lang == "fr") {
                $('#selectedTitle').text('Informations sur l\'orbite');
            } else if (lang == "es") {
                $('#selectedTitle').text('Información de órbita');
            }
        }
        else if (selectedPage == 2) {
            $('.pageChanger').css('border-color', '#15161B');
            $('.subset').css('opacity', 0);
            $('#pageChanger3').css('border-color', '#FFFFFF');
            $('#pageChanger3 .subset').css('opacity', 1);
            $('#selectedTitle').text('Spacecraft Information');
            if (lang == "en") {
                $('#selectedTitle').text('Spacecraft Information');
            } else if (lang == "tr") {
                $('#selectedTitle').text('Uzay Aracı Bilgisi');
            } else if (lang == "ru") {
                $('#selectedTitle').text('Информация о космическом корабле');
            } else if (lang == "zh") {
                $('#selectedTitle').text('航天器信息');
            } else if (lang == "fr") {
                $('#selectedTitle').text('Informations sur l\'engin spatial');
            } else if (lang == "es") {
                $('#selectedTitle').text('Información de la nave espacial');
            }
        }
        else if (selectedPage == 3) {
            $('.pageChanger').css('border-color', '#15161B');
            $('.subset').css('opacity', 0);
            $('#pageChanger4').css('border-color', '#FFFFFF');
            $('#pageChanger4 .subset').css('opacity', 1);
            $('#selectedTitle').text('Temperature Values');
            if (lang == "en") {
                $('#selectedTitle').text('Temperature Values');
            } else if (lang == "tr") {
                $('#selectedTitle').text('Sıcaklık Değerleri');
            } else if (lang == "ru") {
                $('#selectedTitle').text('Значения температуры');
            } else if (lang == "zh") {
                $('#selectedTitle').text('温度值');
            } else if (lang == "fr") {
                $('#selectedTitle').text('Valeurs de température');
            } else if (lang == "es") {
                $('#selectedTitle').text('Valores de temperatura');
            }
        }
        else {
            selectedPage = 0;
            $('.pageChanger').css('border-color', '#15161B');
            $('.subset').css('opacity', 0);
            $('#pageChanger1').css('border-color', '#FFFFFF');
            $('#pageChanger1 .subset').css('opacity', 1);
            $('#selectedTitle').text('External Values');
            if (lang == "en") {
                $('#selectedTitle').text('External Values');
            } else if (lang == "tr") {
                $('#selectedTitle').text('Dış Değerler');
            } else if (lang == "ru") {
                $('#selectedTitle').text('Внешние значения');
            } else if (lang == "zh") {
                $('#selectedTitle').text('外部价值');
            } else if (lang == "fr") {
                $('#selectedTitle').text('Valeurs externes');
            } else if (lang == "es") {
                $('#selectedTitle').text('Valores externos');
            }
        }

    });
    $('#stageButton').click(function () {
        $.ajax({
            type: "Get",
            url: "/stage",
            success: function (data) { }
        });
    });
    $('#ascendButton').click(function () {
        $.ajax({
            type: "Get",
            url: "/ascend",
            success: function (data) { }
        });
    });
    $('#dockButton').click(function () {
        $.ajax({
            type: "Get",
            url: "/dock",
            success: function (data) { }
        });
    });
    $('#rendezvousButton').click(function () {
        $.ajax({
            type: "Get",
            url: "/rendezvous",
            success: function (data) { }
        });
    });
    $('#pageChanger1').click(function () {
        selectedPage = 0;
        $('.custom-carousel').slick('slickGoTo', 0);
        $('.pageChanger').css('border-color', '#15161B');
        $('.subset').css('opacity', 0);
        $('#pageChanger1').css('border-color', '#FFFFFF');
        $('#pageChanger1 .subset').css('opacity', 1);
        $('#selectedTitle').text('External Values');
        if (lang == "en") {
            $('#selectedTitle').text('External Values');
        } else if (lang == "tr") {
            $('#selectedTitle').text('Dış Değerler');
        } else if (lang == "ru") {
            $('#selectedTitle').text('Внешние значения');
        } else if (lang == "zh") {
            $('#selectedTitle').text('外部价值');
        } else if (lang == "fr") {
            $('#selectedTitle').text('Valeurs externes');
        } else if (lang == "es") {
            $('#selectedTitle').text('Valores externos');
        }
    });
    $('#pageChanger2').click(function () {
        selectedPage = 1;
        $('.custom-carousel').slick('slickGoTo', 1);
        $('.pageChanger').css('border-color', '#15161B');
        $('.subset').css('opacity', 0);
        $('#pageChanger2').css('border-color', '#FFFFFF');
        $('#pageChanger2 .subset').css('opacity', 1);
        $('#selectedTitle').text('Orbit Information');
        if (lang == "en") {
            $('#selectedTitle').text('Orbit Information');
        } else if (lang == "tr") {
            $('#selectedTitle').text('Yörünge Bilgisi');
        } else if (lang == "ru") {
            $('#selectedTitle').text('Информация об орбите');
        } else if (lang == "zh") {
            $('#selectedTitle').text('轨道信息');
        } else if (lang == "fr") {
            $('#selectedTitle').text('Informations sur l\'orbite');
        } else if (lang == "es") {
            $('#selectedTitle').text('Información de órbita');
        }
    });
    $('#pageChanger3').click(function () {
        selectedPage = 2;
        $('.custom-carousel').slick('slickGoTo', 2);
        $('.pageChanger').css('border-color', '#15161B');
        $('.subset').css('opacity', 0);
        $('#pageChanger3').css('border-color', '#FFFFFF');
        $('#pageChanger3 .subset').css('opacity', 1);
        $('#selectedTitle').text('Spacecraft Information');
        if (lang == "en") {
            $('#selectedTitle').text('Spacecraft Information');
        } else if (lang == "tr") {
            $('#selectedTitle').text('Uzay Aracı Bilgisi');
        } else if (lang == "ru") {
            $('#selectedTitle').text('Информация о космическом корабле');
        } else if (lang == "zh") {
            $('#selectedTitle').text('航天器信息');
        } else if (lang == "fr") {
            $('#selectedTitle').text('Informations sur l\'engin spatial');
        } else if (lang == "es") {
            $('#selectedTitle').text('Información de la nave espacial');
        }
    });
    $('#pageChanger4').click(function () {
        selectedPage = 3;
        $('.custom-carousel').slick('slickGoTo', 3);
        $('.pageChanger').css('border-color', '#15161B');
        $('.subset').css('opacity', 0);
        $('#pageChanger4').css('border-color', '#FFFFFF');
        $('#pageChanger4 .subset').css('opacity', 1);
        $('#selectedTitle').text('Temperature Values');
        if (lang == "en") {
            $('#selectedTitle').text('Temperature Values');
        } else if (lang == "tr") {
            $('#selectedTitle').text('Sıcaklık Değerleri');
        } else if (lang == "ru") {
            $('#selectedTitle').text('Значения температуры');
        } else if (lang == "zh") {
            $('#selectedTitle').text('温度值');
        } else if (lang == "fr") {
            $('#selectedTitle').text('Valeurs de température');
        } else if (lang == "es") {
            $('#selectedTitle').text('Valores de temperatura');
        }
    });
    var selectedIndex = 0;
    $(window).resize(function () {
        onWindowResize();
        alignIndicators();
        alignTexts();
        renderer.setSize($('.attitude').width(), $('.attitude').height());
        if (window.innerHeight > window.innerWidth) {
            $('.orient').css('display', 'flex');
            document.getElementsByClassName('orient-text')[0].innerText = 'Please rotate your device horizontally.';
        } else {
            if (window.innerWidth > 992) {
                $('.orient').css('display', 'none');
            } else {
                document.getElementsByClassName('orient-text')[0].innerText = 'Screen resolution not supported. Please open this webpage in a bigger screen.';
                $('.orient').css('display', 'flex');
            }
        }
        if (selectedIndex == 0) {
            var $this = $('#firstSelector img');
        } else if (selectedIndex == 1) {
            var $this = $('#secondSelector img');
        } else if (selectedIndex == 2) {
            var $this = $('#thirdSelector img');
        } else {
            var $this = $('#fourthSelector img');
        }
        var selector = $('.selectionIndicator');
        var selectorWidth = selector.width();
        var offset = $this.offset();
        var width = $this.width();
        var centerX = offset.left + width / 2;
        var exactPlace = centerX - selectorWidth / 2;
        selector.css('left', exactPlace);
        alignHighligh();
    });
    $('#firstSelector').click(function () {
        var selector = $('.selectionIndicator');
        var selectorWidth = selector.width();
        var $this = $('#firstSelector img');
        var offset = $this.offset();
        var width = $this.width();
        var centerX = offset.left + width / 2;
        var exactPlace = centerX - selectorWidth / 2;
        selector.css('left', exactPlace);
        selectedIndex = 0;
        alignHighligh();
    });
    $('#secondSelector').click(function () {
        var selector = $('.selectionIndicator');
        var selectorWidth = selector.width();
        var $this = $('#secondSelector img');
        var offset = $this.offset();
        var width = $this.width();
        var centerX = offset.left + width / 2;
        var exactPlace = centerX - selectorWidth / 2;
        selector.css('left', exactPlace);
        selectedIndex = 1;
        alignHighligh();
    });
    $('#thirdSelector').click(function () {
        var selector = $('.selectionIndicator');
        var selectorWidth = selector.width();
        var $this = $('#thirdSelector img');
        var offset = $this.offset();
        var width = $this.width();
        var centerX = offset.left + width / 2;
        var exactPlace = centerX - selectorWidth / 2;
        selector.css('left', exactPlace);
        selectedIndex = 2;
        alignHighligh();
        setTimeout(function () { alignIndicators(); }, 100);
        setTimeout(function () { alignTexts(); }, 100);
        renderer.setSize($('.attitude').width(), $('.attitude').height());
        setTimeout(function () { $('.attitude canvas').css('border', 'solid'); }, 1000);
        setTimeout(function () { $('.attitude canvas').css('border', 'none'); }, 1010);
        setTimeout(function () { document.getElementsByTagName("text")[4].innerHTML = "SPEED"; }, 100);
    });
    $('#fourthSelector').click(function () {
        var selector = $('.selectionIndicator');
        var selectorWidth = selector.width();
        var $this = $('#fourthSelector img');
        var offset = $this.offset();
        var width = $this.width();
        var centerX = offset.left + width / 2;
        var exactPlace = centerX - selectorWidth / 2;
        selector.css('left', exactPlace);
        selectedIndex = 3;
        alignHighligh();
    });
});

function languageSelector(lang) {
    selectedLanguage = lang;
    if (lang == "en") {
        $('#languageSelector').text('English');
        $('.dropdown-item').removeClass('active');
        $('#langEn').addClass('active');
    } else if (lang == "ru") {
        $('#languageSelector').text('Pусский');
        $('.dropdown-item').removeClass('active');
        $('#langRu').addClass('active');
    } else if (lang == "zh") {
        $('#languageSelector').text('中文');
        $('.dropdown-item').removeClass('active');
        $('#langZh').addClass('active');
    } else if (lang == "tr") {
        $('#languageSelector').text('Türkçe');
        $('.dropdown-item').removeClass('active');
        $('#langTr').addClass('active');
    } else if (lang == "fr") {
        $('#languageSelector').text('Français');
        $('.dropdown-item').removeClass('active');
        $('#langFr').addClass('active');
    } else if (lang == "es") {
        $('#languageSelector').text('Español');
        $('.dropdown-item').removeClass('active');
        $('#langEs').addClass('active');
    } else if (lang == "jp") {
        $('#languageSelector').text('日本語');
        $('.dropdown-item').removeClass('active');
        $('#langJp').addClass('active');
    } else if (lang == "uk") {
        $('#languageSelector').text('Український');
        $('.dropdown-item').removeClass('active');
        $('#langUk').addClass('active');
    }
}

function saveSettings() {
    var chartsRateNew = $('#chartRefreshRate').val();
    var refreshRateNew = $('#refreshRate').val();
    $.get('/sendValues', {language: selectedLanguage, chartsRate: chartsRateNew, refreshRate: refreshRateNew});
    setTimeout(function(){location.assign("/");}, 1000);
}

var flightProfile = document.getElementById('flightProfile');
var flightProfileChart = new Chart(flightProfile, {
    // The type of chart we want to create
    type: 'line',
    gridLines: [{ display: false }],
    // The data for our dataset
    data: {
        labels: ["", "", "", "", "", "", ""],
        datasets: [{
            label: 'Flight Profile',
            borderColor: '#fff',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill: false,
            radius: 0,
        }]
    },

    // Configuration options go here
    options: {
        maintainAspectRatio: false,
        tooltips: {
            enabled: false,
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false,
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }]
        }
    }
});

var dvTime = document.getElementById('dvTime');
var dvTimeChart = new Chart(dvTime, {
    // The type of chart we want to create
    type: 'line',
    gridLines: [{ display: false }],
    // The data for our dataset
    data: {
        labels: ["", "", "", "", "", "", ""],
        datasets: [{
            label: 'Flight Profile',
            borderColor: '#fff',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill: false,
            radius: 0,
        }]
    },

    // Configuration options go here
    options: {
        maintainAspectRatio: false,
        tooltips: {
            enabled: false,
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false,
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }]
        }
    }
});

var altTime = document.getElementById('altTime');
var altTimeChart = new Chart(altTime, {
    // The type of chart we want to create
    type: 'line',
    gridLines: [{ display: false }],
    // The data for our dataset
    data: {
        labels: ["", "", "", "", "", "", ""],
        datasets: [{
            label: 'Flight Profile',
            borderColor: '#fff',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill: false,
            radius: 0,
        }]
    },

    // Configuration options go here
    options: {
        maintainAspectRatio: false,
        tooltips: {
            enabled: false,
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false,
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }]
        }
    }
});

var apTime = document.getElementById('apTime');
var apTimeChart = new Chart(apTime, {
    // The type of chart we want to create
    type: 'line',
    gridLines: [{ display: false }],
    // The data for our dataset
    data: {
        labels: ["", "", "", "", "", "", ""],
        datasets: [{
            label: 'Flight Profile',
            borderColor: '#fff',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill: false,
            radius: 0,
        }]
    },

    // Configuration options go here
    options: {
        maintainAspectRatio: false,
        tooltips: {
            enabled: false,
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false,
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }]
        }
    }
});

var velTime = document.getElementById('velTime');
var velTimeChart = new Chart(velTime, {
    // The type of chart we want to create
    type: 'line',
    gridLines: [{ display: false }],
    // The data for our dataset
    data: {
        labels: ["", "", "", "", "", "", ""],
        datasets: [{
            label: 'Flight Profile',
            borderColor: '#fff',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill: false,
            radius: 0,
        }]
    },

    // Configuration options go here
    options: {
        maintainAspectRatio: false,
        tooltips: {
            enabled: false,
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false,
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                }
            }]
        }
    }
});