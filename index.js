
window.addEventListener("onload", init());

function isTouchDevice() {
    return ('ontouchstart' in document.documentElement);
}
console.log('isTouchDevice? ', isTouchDevice());


function init() {
    
    let canvas = initFullScreenCanvas("mainCanvas");
    let ctx = canvas.getContext("2d");

    if (isTouchDevice()) {
        canvas.addEventListener("touchstart", function (e) {
            for (let i = 0; i < e.targetTouches.length; i++) {
                drawBullet(
                    e.targetTouches[i].pageX - canvas.offsetLeft,
                    e.targetTouches[i].pageY - canvas.offsetTop, ctx);
            }
            e.stopPropagation();
            e.preventDefault();
        }, false);
    } else {
       canvas.addEventListener("mousedown", function(e){
           drawBullet(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, ctx);
           e.stopPropagation();
           e.preventDefault();
       }, false); 
    }
}
// drawing bullet in position x,y on ctx element
function drawBullet(x, y, ctx) {
    ctx.fillStyle = "darkred";
    ctx.strokeStyle = "black";
    ctx.clientWidth = 4;
    ctx.beginPath();
    ctx.arc(x,y, 15, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
}


function initFullScreenCanvas(canvasId) {
    let canvas = document.getElementById(canvasId);
    
    resizeCanvas(canvas);
    window.addEventListener("resize", function() {
        resizeCanvas(canvas);
    });
    return canvas;
}

function resizeCanvas(canvas) {
    console.log(canvas);
    canvas.width  = document.width || document.body.clientWidth;
    canvas.height = document.height || document.body.clientHeight;
}
