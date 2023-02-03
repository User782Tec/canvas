const cover = document.getElementById('cover');
const frame = document.getElementById('frame');
const prizeElt = document.getElementById('prize');
const coverctx = cover.getContext('2d');
const framectx = frame.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
let innerWidth = window.innerWidth + 'px';
let innerHeight = window.innerHeight + 'px';
cover.width = width;
cover.height = height;
frame.width = width;
frame.height = height;
cover.style.width = innerWidth;
cover.style.height = innerHeight;
frame.style.width = innerWidth;
frame.style.height = innerHeight;
prizeElt.style.width = innerWidth;
prizeElt.style.height = innerHeight;

const prizes = {
    '特等奖': 0.9,
    '一等奖': 0.8,
    '二等奖': 0.6,
    '三等奖': 0.4,
    '参与奖': 0.0
}

var isDrawing = false;

function setPrize() {
    let num = Math.random();
    var prize;
    for (const [key, value] of Object.entries(prizes)) {
        if (num > value) {
            prize = key;
            break;
        }
    }
    const elt = document.createElement('div');
    elt.innerText = prize;
    const prompt = document.createElement('div');
    prompt.id = 'prompt';
    prompt.innerText = '恭喜你抽中了: ';
    prizeElt.appendChild(prompt);
    prizeElt.appendChild(elt);
}

coverctx.fillStyle = '#ddd';
coverctx.fillRect(width / 6, height / 6, width / (3 / 2), height / (3 / 2));
coverctx.fillStyle = '#aaa';
coverctx.font = '50px sans-serif';
coverctx.fillText('刮奖区', (width / 2) - (coverctx.measureText('刮奖区').width / 2), height / 2 + 25);
coverctx.globalCompositeOperation = 'destination-out';
coverctx.strokeStyle = '#000';
coverctx.lineWidth = '50';
coverctx.lineCap = 'round';
coverctx.lineJoin = 'round';

frame.addEventListener('touchstart', (e) => {
    coverctx.beginPath();
    coverctx.moveTo(e.touches[0].pageX, e.touches[0].pageY);
});
frame.addEventListener('touchmove', (e) => {
    coverctx.lineTo(e.touches[0].pageX, e.touches[0].pageY);
    coverctx.stroke();
});
frame.addEventListener('touchend', () => {
    coverctx.stroke();
    coverctx.closePath();
});
frame.addEventListener('touchcancel', () => {
    coverctx.closePath();
});

frame.addEventListener('mousedown', (e) => {
    isDrawing = true;
    coverctx.beginPath();
    coverctx.moveTo(e.pageX, e.pageY);
});
frame.addEventListener('mousemove', (e) => {
    if (isDrawing === true) {
        coverctx.lineTo(e.pageX, e.pageY);
        coverctx.stroke();
    }
});
frame.addEventListener('mouseup', () => {
    isDrawing = false;
    coverctx.stroke();
    coverctx.closePath();
});

framectx.lineWidth = '20';
framectx.strokeStyle = 'orange';
framectx.strokeRect(width / 6, height / 6, width / (3 / 2), height / (3 / 2));

setPrize();
