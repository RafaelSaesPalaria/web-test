var vh = 0

var sun = document.querySelector("div#sun")
var earth = document.querySelector("div#earth")
var moon = document.querySelector("div#moon")

var position=0
var moonspeed = 0.8
var earthspeed = 0.4

var interval = setInterval(sunCentered,10)

function start() {
    resize();
    window.addEventListener('zoom', resize);
    createStars();
    sunCentered()
}

function resize() {
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

function sunClicked() {
    clearInterval(interval)
    interval = setInterval(sunCentered,10)
    sunCentered()
    center(sun)
}

function earthClicked() {
    clearInterval(interval)
    interval = setInterval(earthCentered,10)
    earthCentered()
    center(earth)
}

function moonClicked() {
    clearInterval(interval)
    interval = setInterval(moonCentered,10)
    moonCentered()
    center(moon)
}

function center(obj) {
    obj.style.left = `${innerWidth/2}px`
    obj.style.top = `${innerHeight/2}px`
}

function sunCentered() {
    orbit(sun   ,earth,position*0.4,vh*0.4)
    orbit(earth,moon,position*0.8,vh*0.2)
    updateEarthBackground(position*0.4)

    position+=1
}

function earthCentered() {
    orbit(earth, sun,position*0.4,vh*0.4)
    orbit(earth,moon,position*0.8,vh*0.2)
    updateEarthBackground((position*0.4)+180)

    position+=1
}

function moonCentered() {
    orbit(moon,sun,position*0.4,vh*0.4)
    orbit(moon,earth,position*0.8,vh*0.2)
    updateEarthBackground((position*0.4)+180)

    position+=1
}

function orbit(centerObj,satelliteObj,deg,radius) {

    let theta = (Math.PI*2)/360
    let orbitX = Math.sin(theta*deg)*(radius)
    let orbitY = Math.cos(theta*deg)*(radius)

    let centerX = centerObj.getBoundingClientRect().left + centerObj.getBoundingClientRect().width / 2;

    let centerY = centerObj.getBoundingClientRect().top + centerObj.getBoundingClientRect().height / 2;

    satelliteObj.style.top = `${centerY+orbitY}px`
    satelliteObj.style.left = `${centerX+orbitX}px`
}

function createStars() {
    for (n=0;n<200;n++) {
        window.document.getElementById("stars").innerHTML += '<div class="star" id=star-'+n+'></div>';

        window.document.getElementById("star-"+n).style.top = (Math.random()*100)+"%";
        window.document.getElementById("star-"+n).style.left = (Math.random()*100)+"%";
    }
}

function updateEarthBackground(deg) {
    deg = (360 - (deg-90)) % 360;
    let theta = (deg * Math.PI) / 180;

    let x = Math.cos(theta) * 100;
    let y = Math.sin(theta) * 100;

    earth.style.background = `radial-gradient(circle at ${50 + x}% ${50 + y}%, darkblue, blue 60%, yellow 95%)`;
}