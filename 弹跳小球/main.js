const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
let width = canvas.width;
let height = canvas.height;

let fps = 0;

class Ball {
    constructor(radius, x, y, vx, vy, color) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        Ball.ball.push(this);
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    animate() {
        this.draw();
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
            this.vy = -this.vy;
        }
        if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
            this.vx = -this.vx;
        }
        //window.requestAnimationFrame(this.animate.bind(this));
    }
    static draw() {
        //ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(0, 0, width, height);
        for (const elt of Ball.ball) {
            elt.draw();
            elt.animate();
        }
        window.requestAnimationFrame(Ball.draw);
    }
}
Ball.ball = [];

function test() {
    fps++;
    window.requestAnimationFrame(test);
}
function display() {
    document.getElementById('result').innerText = fps + 'fps';
    fps = 0;
}

var ball1 = new Ball(10, 5, 5, 5, 10,'#ee0000');
var ball2 = new Ball(10, 5, 5, 10, 5, '#66ccff');
var ball3 = new Ball(10, 5, 5, 10, 10, "#3cdb6e");

Ball.draw();

window.setInterval(display, 1000);
window.requestAnimationFrame(test);