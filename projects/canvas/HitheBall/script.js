var level = document.querySelector("canvas")
level.width = innerWidth*0.95
level.height= innerHeight*0.7

var c = level.getContext("2d")

function Circle(x,y,dx,dy,radius) {
    this.x = x
    this.y = y
    this.dx=dx
    this.dy=dy
    this.radius=radius

    this.draw = function() {
        c.beginPath()
        c.arc(x,y,radius,0,Math.PI*2,false)
        c.stroke()
        c.closePath()
    };

    this.update = function() {
        this.draw()
    }

}

var circleArray = []
function init() {
    for (let i=0;i<10;i++) {
        let radius = 30
        let x = radius+Math.random()*(level.width-2*radius)
        let y = radius+Math.random()*(level.height-2*radius)
        let circle = new Circle(x,y,10,10,radius);
        circleArray.push(circle)
    }
}

function animate() {
    c.clearRect(0,0,level.width,level.height)
    requestAnimationFrame(animate)

    circleArray.forEach(circle => {
        circle.update()
    })

}

init()
animate()