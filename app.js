const canvas = document.getElementById("jsCanvas");
// canvas element는 두 개의 사이즈를 가져야 한다. css와 canvas

canvas.width = 700;
canvas.height = 700;

// context는 canvas 안에서 픽셀을 다루는 것
const ctx = canvas.getContext("2d");    // 2d 말고 다른 타입도 가능

// 선 색
ctx.strokeStyle = "#2c2c2c";

// 선의 너비
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
    if (!painting) {
        // path는 선이라고 생각하면 간단하다. path를 만들면 마우스의 x, y 좌표로 path를 옮긴다.
        // 클릭하지 않았을 때, path만 만들고(움직이고) 있다.
        console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // 마우스 클릭했을 때 발생
        console.log("creating line in ", x, y);
        ctx.lineTo(x, y);   // path의 전 위치에서 지금 위치까지 선을 만든다.
        ctx.stroke();       // strokeStyle로 path를 만들고 획을 긋는다.
        // ctx.closePath();    // 계속 클릭하고 있으면 시작점은 moveTo(x, y)만 되는 것
    }
}

// 클릭했을 때 반응
function onMouseDown(event) {
    // console.log(event);
    painting = true;    // 그리는 중
}

function handleColorClick(event) {
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

// console.log(Array.from(colors));

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));