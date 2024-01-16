const GRID_SIZE = 16;
let mouseDown = false;
// create a grid of 16x16 when page/window is loaded
window.addEventListener("load", () => createCanvas(GRID_SIZE));


const canvas = document.getElementById("canvas")
canvas.addEventListener("mousedown", () => { mouseDown = true; } );
canvas.addEventListener("mouseup", () => { mouseDown = false; } );

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
        event.target.style.backgroundColor = "black";
    } else if (mouseDown) {
        event.target.style.backgroundColor = "black";
    }
}