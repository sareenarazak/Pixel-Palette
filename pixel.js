// DOM Elements
const canvas = document.getElementById("canvas");
const colorPicker = document.getElementById("color-picker");
const colorChaosBtn = document.getElementById("color-chaos");
const pixelSizeInput = document.getElementById("pixel-size");
const clearButton = document.getElementById("clear");
const eraseButton = document.getElementById("eraser");
const pixelSizeLabel = document.querySelector(".pixel-size");

// Variables
let pixelSize = Number.parseInt(pixelSizeInput.value, 10);
let mouseDown = false;
let currentColor = "#000000"; // Default color black
let mode = "normal";


// Event Listeners
window.addEventListener("load", () => createPixelArtCanvas(pixelSize));

canvas.addEventListener("mouseup", () => { mouseDown = false; } );
canvas.addEventListener("mousedown", () => { mouseDown = true; } );

colorPicker.addEventListener("input", setColor);
colorChaosBtn.addEventListener("click", () => changeMode("chaos"));
pixelSizeInput.addEventListener("input", changePixelSize);

eraseButton.addEventListener("click", () => changeMode("erase"));
clearButton.addEventListener("click", clearCanvas);


function createPixelArtCanvas(pixelSize) {
    let count = Math.floor(canvas.clientHeight/ pixelSize);

    for(let index = 0; index <  count * count ; index++) {
        const pixelDiv = document.createElement("div");
        pixelDiv.style.width = `${pixelSize}px`;
        pixelDiv.style.height = `${pixelSize}px`;
        pixelDiv.classList.add("pixel-div");
        canvas.appendChild(pixelDiv);

        pixelDiv.addEventListener("click",  drawPixel);
        pixelDiv.addEventListener("mouseenter",  drawPixel);
    }
}

function drawPixel(event) {
    if (mode === "chaos") {
        currentColor = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
    } else if (mode ==="erase") {
        currentColor = "white";
    }

    if(event.type === "click" || (event.type === "mouseenter" &&  mouseDown)) {
        event.target.style.backgroundColor = currentColor;
    }
}

function setColor(event) {
    mode = "normal";
    currentColor = event.target.value;
}

function clearCanvas() {
    const pixelDivs = document.querySelectorAll(".pixel-div");
    pixelDivs.forEach(pixel => pixel.style.backgroundColor = "white");
   // changeMode("normal"); --> Rethink this
}

function changePixelSize(event) {
    deletePixels();
    pixelSize = event.target.value;
    pixelSizeLabel.innerText = `${pixelSize} x ${pixelSize}`;
    createPixelArtCanvas(pixelSize);
}

function deletePixels() {
    canvas.innerHTML = "";
    //pixelDivs.forEach(pixel => pixel.re)
}
function changeMode(newNode) {
    mode = newNode;
}
function setPixelSize(event) {
    console.log("Size before " + pixelSize);
    pixelSize = event.target.value;
    console.log("Size after " + pixelSize);
}

// TODO : 1) highlight the button for chaos mode +
//  make the color picker mode only if the chaos mode is off and the other mode is on
//  2 ) have a color picker that shoes the color picked
//  3) make the label appear on the side of the color picker
