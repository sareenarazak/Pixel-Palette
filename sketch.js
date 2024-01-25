
const canvas = document.getElementById("canvas")
const colorPicker = document.getElementById("color-picker");
const rgbRandom = document.getElementById("rgb-random");
const pixelSizeInput = document.getElementById("pixel-size");
const clearButton = document.getElementById("clear");

let pixelSize = pixelSizeInput.value;
let mouseDown = false;
let color = "black";
let rgbRandomMode = false;

window.addEventListener("load", () => createCanvas(pixelSize));

canvas.addEventListener("mousedown", () => { mouseDown = true; } );
canvas.addEventListener("mouseup", () => { mouseDown = false; } );

colorPicker.addEventListener("input", setColor);
rgbRandom.addEventListener("click", setSketchMode);
pixelSizeInput.addEventListener("input", setPixelSize);
clearButton.addEventListener("click", clearCanvas);

function createCanvas(size) {
    for(let index = 0; index < size * size; index++) {
        const gridDiv = document.createElement("div");
        gridDiv.style.width = size + "px";
        gridDiv.style.height = size + "px";

        gridDiv.classList.add("grid-div");
        canvas.appendChild(gridDiv);

        gridDiv.addEventListener("click",  sketchGrid);
        gridDiv.addEventListener("mouseenter",  sketchGrid);
    }
}

function sketchGrid(event) {
    if(rgbRandomMode) {
        color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    if(event.type === "click") {
        event.target.style.backgroundColor = color;
    } else if (mouseDown) {
        event.target.style.backgroundColor = color;
    }
}

function setColor(event) {
    rgbRandomMode = false;
    color = event.target.value;
}

function setSketchMode() {
    rgbRandomMode = true;
}

// function setPixelSize(event) {
//     console.log("Size before " + pixelSize);
//     pixelSize = event.target.value;
//     console.log("Size after " + pixelSize);
//
// }