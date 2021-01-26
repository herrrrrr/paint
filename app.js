const canvas = document.getElementById("jsCanvas");

// context는 canvas 안에서 픽셀을 다루는 것
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#2c2c2c";

// controls__range 크기 조절
ctx.lineWidth = 2.5;

let painting = false;   // 그림 (기본으로 false)

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

// 마우스가 캔버스 안에서 움직일 때
function onMouseMove(event) {
    // offset X와 Y 값 가져오기
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x, y);
}

// 클릭했을 때 반응
function onMouseDown(event) {
    // console.log(event);
    painting = true;    // 그리는 중
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}