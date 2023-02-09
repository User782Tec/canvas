const canvas = document.getElementById('canvas');
const bg = document.getElementById('bg');
const ctx = canvas.getContext('2d');
const bgctx = bg.getContext('2d');

canvas.width = window.innerWidth * 4;
canvas.height = window.innerHeight * 4;
bg.width = window.innerWidth * 4;
bg.height = window.innerHeight * 4;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
bg.style.width = window.innerWidth + 'px';
bg.style.height = window.innerHeight + 'px';
let width = canvas.width;
let height = canvas.height;

ctx.translate(width / 2, height / 2);
bgctx.translate(width / 2, height / 2);
ctx.transform(5, 0, 0, 5, 0, 0);
bgctx.transform(6, 0, 0, 6, 0, 0);

function drawbase() {
    bgctx.strokeStyle = 'blue';
    bgctx.lineWidth = '10';
    bgctx.beginPath();
    bgctx.arc(0, 0, 100, 0, Math.PI * 2);
    bgctx.closePath();
    bgctx.stroke();
    bgctx.lineWidth = '4';
    for (var i = 0; i < 12; i++) {
        bgctx.rotate(30 * Math.PI / 180);
        bgctx.beginPath();
        bgctx.moveTo(0, 100);
        bgctx.lineTo(0, 76);
        bgctx.closePath();
        bgctx.stroke();
    }
    bgctx.lineWidth = '2';
    for (var i = 0; i < 60; i++) {
        bgctx.rotate(6 * Math.PI / 180);
        bgctx.beginPath();
        bgctx.moveTo(0, 100);
        bgctx.lineTo(0, 85);
        bgctx.closePath();
        bgctx.stroke();
    }
}

function draw() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    ctx.clearRect(-(width / 2), -(height / 2), width, height);

    ctx.lineWidth = '3';
    ctx.strokeStyle = 'red';
    ctx.rotate(30 * Math.PI / 180 * ((hours > 12 ? hours : hours - 12) + (minutes / 60) + (seconds / 3600)));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 60);
    ctx.closePath();
    ctx.stroke();
    ctx.rotate(30 * Math.PI / 180 * (12 - ((hours > 12 ? hours : hours - 12) + (minutes / 60) + (seconds / 3600))));

    ctx.lineWidth = '2';
    ctx.strokeStyle = 'skyblue';
    ctx.rotate(6 * Math.PI / 180 * (minutes + (seconds / 60)));
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 80);
    ctx.closePath();
    ctx.stroke();
    ctx.rotate(6 * Math.PI / 180 * (60 - (minutes + (seconds / 60))));

    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.rotate(6 * Math.PI / 180 * seconds);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 90);
    ctx.closePath();
    ctx.stroke();
    ctx.rotate(6 * Math.PI / 180 * (60 - seconds));

    window.setTimeout(draw, 1000);
}

ctx.rotate(Math.PI);
drawbase();
draw();