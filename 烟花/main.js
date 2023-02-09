const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
let width = canvas.width;
let height = canvas.height;

class Canvas {
    static draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        for (const elt of Firework.firework) {
            if (elt.animating === true) {
                elt.animate();
            }
        }
        for (const elt of FireworkSpread.fireworkspread) {
            if (elt.animating === true) {
                elt.animate();
            }
        }
        window.requestAnimationFrame(Canvas.draw);
    }
}

class Firework {
    constructor(radius, x, y, vy, color, time, shake) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.color = color;
        this.time = time;
        this.shake = shake;
        this.frames = 0;
        this.animating = true;
        Firework.firework.push(this);
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
        this.y -= this.vy;
        this.x += Math.cos(this.frames / 60 * this.shake);
        this.frames++;
        if (this.frames > this.time * 60) {
            this.vy *= 0.99;
            if (this.vy < 0.6) {
                this.animating = false;
                var time = Math.floor(Math.random() * 10);
                for (var i = (Math.floor(Math.random() * 3) + 1); i > 0; i--) {
                    window.setTimeout(this.spread.bind(this, this.vy / i, time), Math.floor(Math.random() * 500) + 700);
                }
            }
        }
    }
    spread(vy, time) {
        for (var i = 0; i < 360; i += 10) {
            new FireworkSpread(this.radius, this.x, this.y, i, vy, this.color, time);
        }
    }
}
Firework.firework = [];

class FireworkSpread extends Firework {
    constructor(radius, x, y, rotate, vy, color, time) {
        super();
        this.radius = radius;
        this.x = 0;
        this.y = 0;
        this.rotate = rotate;
        this.vy = vy;
        this.color = color;
        this.time = time;
        this.frames = 0;
        this.animating = true;
        this.centerX = x;
        this.centerY = y;
        FireworkSpread.fireworkspread.push(this);
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
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.rotate * Math.PI / 180);
        this.draw();
        ctx.rotate((Math.PI * 2) - (this.rotate * Math.PI / 180));
        ctx.translate(-(this.centerX), -(this.centerY));
        this.y += this.vy;
        this.frames++;
        if (this.frames > this.time * 60) {
            this.vy *= 0.99;
            if (this.vy < 0.6) {
                this.animating = false;
            }
        }
    }
}
FireworkSpread.fireworkspread = [];

window.addEventListener('mousedown', (e) => {
    new Firework(Math.floor(Math.random() * 2) + 3, e.pageX, height, 4, `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`, Math.random(), Math.floor(Math.random() * 20));
});
window.requestAnimationFrame(Canvas.draw);