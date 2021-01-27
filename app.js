const canvas = document.getElementById("jsCanvas");
// canvas element는 두 개의 사이즈를 가져야 한다. css와 canvas

// context는 canvas 안에서 픽셀을 다루는 것
const ctx = canvas.getContext("2d");    // 2d 말고 다른 타입도 가능

const colors = document.getElementsByClassName("jsColor");

const range = document.getElementById("jsRange");

const mode = document.getElementById("jsMode");

const saveBtn = document.getElementById("jsSave");

// 색상 default 값
const INITIAL_COLOR = "#2c2c2c";

const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 캔버스 배경 기본값 white ... 설정 안 할 시 투명으로 저장됨.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 선 색
ctx.strokeStyle = INITIAL_COLOR;    // default 값이 #2c2c2c

// 채우기 색
ctx.fillStyle = INITIAL_COLOR;

// 선의 너비
ctx.lineWidth = 2.5;

let painting = false;   // 그리기 (기본으로 false)
let filling = false;    // 채우기

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
        // console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // 마우스 클릭했을 때 발생
        // console.log("creating line in ", x, y);
        ctx.lineTo(x, y);   // path의 전 위치에서 지금 위치까지 선을 만든다.
        ctx.stroke();       // strokeStyle로 path를 만들고 획을 긋는다.
        // ctx.closePath();    // 계속 클릭하고 있으면 시작점은 moveTo(x, y)만 되는 것
    }
}

// 클릭했을 때 반응
// function onMouseDown(event) {
//     // console.log(event);
//     painting = true;    // 그리는 중
// }

function handleColorClick(event) {
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;        // strokeStyle을 override 하고, target에 있는 색상으로 변경
    ctx.fillStyle = color;      // filling이나 painting이나 같은 style을 갖는다.
}

function handleRangeClick(event) {
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

// Fill, Paint
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    // console.log(event);         // 우클릭 방지
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    // console.log(image);
    const link = document.createElement("a");   // 존재하지 않는 링크 만들기
    link.href = image;
    link.download = "PaintJS";
    // console.log(link);
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// console.log(colors);
// console.log(Array.from(colors));

/*
색상 array를 만들고, forEach로 potato를 돌려서
addEventListener("click", handleColorClick) 호출
이름(potato)은 array 안의 각각의 아이템을 대표하는 것. 뭐로 하든 상관없다.
*/
Array.from(colors).forEach(potato =>
    potato.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeClick);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}