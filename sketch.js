const GRID_SIZE = 16;
let mouseDown = false;
let color = "black";
const canvas = document.getElementById("canvas")
const colorPicker = document.getElementById("color-picker");

// create a grid of 16x16 when page/window is loaded
window.addEventListener("load", () => createCanvas(GRID_SIZE));

canvas.addEventListener("mousedown", () => { mouseDown = true; } );
canvas.addEventListener("mouseup", () => { mouseDown = false; } );

colorPicker.addEventListener("input", setColor);

function createCanvas(size) {

    for(let index = 0; index < size * size; index++) {
        const gridDiv = document.createElement("div");
        gridDiv.classList.add("grid-div");
        canvas.appendChild(gridDiv);
        gridDiv.addEventListener("click",  sketchGrid);

        gridDiv.addEventListener("mouseenter",  sketchGrid);
    }
}

function sketchGrid(event) {
    if(event.type === "click") {
        event.target.style.backgroundColor = color;
    } else if (mouseDown) {
        event.target.style.backgroundColor = color;
    }
}

function setColor(event) {
    color = event.target.value;
}