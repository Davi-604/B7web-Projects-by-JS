// FUNÇÕES AUXILIARES
let d = e => document.querySelector(e);
let da = e => document.querySelectorAll(e);

// VARIÁVEIS
let currentColor = 'black';
let screen = d('#tela');
let ctx = screen.getContext('2d');
let canDraw = false;
let mouseX = 0
let mouseY = 0

// EVENTOS
da('.color').forEach((item) => {
    item.addEventListener('click', colorClick)
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mousemoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
screen.addEventListener('mouseleave', mouseLeaveEvent);
d('.clear').addEventListener('click', clearDrawn);

// FUNÇÕES

function colorClick (e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    d('.color.active').classList.remove('active');
    e.target.classList.add('active')
};

// FUNÇÕES DO MOUSE

function mouseDownEvent (e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
};
function mousemoveEvent (e) {
    if(canDraw) {
        draw(e.pageX, e.pageY)
    }
};
function mouseUpEvent () {
    canDraw = false
};
function mouseLeaveEvent () {
    canDraw = false
}

function draw (x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
};
function clearDrawn () {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}