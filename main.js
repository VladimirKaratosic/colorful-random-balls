var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function for generating a random number
function randomNumber(min, max) {
    var number = Math.floor(Math.random() * (max - min)) + min;
    return number;
}

function Ball(x, y, speedX, speedY, color, size) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function() {
    if(this.x + this.size >= width) {
        this.speedX = -(this.speedX);
    }

    if(this.x - this.size <= 0) {
        this.speedX = -(this.speedX);
    }

    if(this.y + this.size >= height) {
        this.speedY = -(this.speedY);
    }

    if(this.y - this.size <= 0) {
        this.speedY = -(this.speedY);
    }

    this.x += this.speedX;
    this.y += this.speedY;
}

var balls = [];

while(balls.length < 25) {
    var size = randomNumber(10, 20);
    var ball = new Ball(
        randomNumber(0 + size, width - size),
        randomNumber(0 + size, height - size),
        randomNumber(-7, 7),
        randomNumber(-7, 7),
        'rgb(' + randomNumber(0,255) + "," + randomNumber(0,255) + "," + randomNumber(0,255) + ')',
        size
    );

    balls.push(ball);
}

function loop() {
    var i, length = balls.length;
    ctx.fillStyle = 'rgb(0,0,0,0.25';
    ctx.fillRect(0, 0, width, height);

    for(i = 0; i < length; i++) {
        balls[i].draw();
        balls[i].update();
    }

    requestAnimationFrame(loop);
}

loop();