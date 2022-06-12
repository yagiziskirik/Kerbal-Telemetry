var selectedPage = 0;
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function mobileCheck () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function checkTime() {
    var d = new Date();
    var x = document.getElementById("realTime");
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    x.innerText = h + ":" + m;
}

setInterval(function () { checkTime(); }, 4000);

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
    renderer.render(scene, camera);
    renderer.setSize($('.attitude').width(), $('.attitude').height());
};

if (!mobileCheck()) setInterval(() => { render() }, 250);

// setTimeout(function () { render(); }, 4000);

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
    // TODO: Add functionality to the buttons
    // $('#stageButton').click(function () {
    //     $.getJSON("/static/stage.json", (data) => {
    //         console.log(data);
    //     });
    // });
    // $('#ascendButton').click(function () {
    //     $.ajax({
    //         type: "Get",
    //         url: "/ascend",
    //         success: function (data) { }
    //     });
    // });
    // $('#dockButton').click(function () {
    //     $.ajax({
    //         type: "Get",
    //         url: "/dock",
    //         success: function (data) { }
    //     });
    // });
    // $('#rendezvousButton').click(function () {
    //     $.ajax({
    //         type: "Get",
    //         url: "/rendezvous",
    //         success: function (data) { }
    //     });
    // });
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