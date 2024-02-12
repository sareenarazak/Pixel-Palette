/**
 *  TODOs:
 *  1. refactor the 4 methods for button clicks
 *  2. Use flexbox to group color picker and the normal mode button
 *  3. Ask for code review
 *  4. Set up ESLint (do i need it )
 *  5. Remove box shadow
 *  6. Add read me
 *  7. Do I highlight normal mode on load
 *  8. remove highlights when reset canvas
 *  9. Use grid css instead of div
 *
 */

// Data structure for canvas state
const canvasState = {
    mode : "normal",
    pixelSize : 16,
    pixelData  : {}
}

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const normalModeBtn = document.getElementById("color-normal");
    const colorPicker = document.getElementById("color-picker");
    const chaosModeBtn = document.getElementById("color-chaos");
    const pixelSizeInput = document.getElementById("pixel-size");
    const clearButton = document.getElementById("clear");
    const eraseButton = document.getElementById("eraser");
    const pixelSizeLabel = document.getElementById("pixel-size");


    //let pixelSize = Number.parseInt(pixelSizeInput.value, 10);
    let mouseDown = false;

    let currentColor = "#000000"; // Default color black

    createPixelArtCanvas(canvasState.pixelSize);

    canvas.addEventListener("mouseup", () => { mouseDown = false; });
    canvas.addEventListener("mousedown", () => { mouseDown = true; });

    normalModeBtn.addEventListener("click", handleNormalModeButtonClick);
    colorPicker.addEventListener("input", handleColorPickerInputChange);

    chaosModeBtn.addEventListener("click", handleChaosModeButtonClick);

    eraseButton.addEventListener("click", handleEraseButtonClick);
    clearButton.addEventListener("click", clearCanvas);

    pixelSizeInput.addEventListener("input", resetCanvas);

    function createPixelArtCanvas(pixelSize) {
        let count = Math.floor(canvas.clientHeight / pixelSize);
        for (let index = 0; index < count * count; index++) {
            const pixelDiv = document.createElement("div");

            pixelDiv.style.width = `${pixelSize}px`;
            pixelDiv.style.height = `${pixelSize}px`;
            pixelDiv.classList.add("pixel-div");
            pixelDiv.id = index;

            canvas.appendChild(pixelDiv);

            pixelDiv.addEventListener("click", (event) => {
                drawPixel(event, index);
            });
            pixelDiv.addEventListener("mouseenter", (event) => {
                drawPixel(event, index);
            });
        }
    }

    function drawPixel(event, index) {
        if (canvasState.mode === "chaos") {
            setColor("#" + (Math.random() * 0xFFFFFF << 0).toString(16));
        } else if (canvasState.mode === "erase") {
            setColor("white");
        }
        if (event.type === "click" || (event.type === "mouseenter" && mouseDown)) {
            event.target.style.backgroundColor = currentColor;
            canvasState.pixelData[index] = currentColor;
        }
    }

    function handleNormalModeButtonClick() {
        highlightButton(normalModeBtn);
        setMode("normal");
        setColor(colorPicker.value);
    }

    function handleColorPickerInputChange(event) {
        highlightButton(normalModeBtn);
        setMode("normal");
        setColor(event.target.value);
    }

    function handleChaosModeButtonClick() {
        highlightButton(chaosModeBtn);
        setMode("chaos")
    }

    function handleEraseButtonClick() {
        highlightButton(eraseButton);
        setMode("erase");
    }

    function resetCanvas(event) {
        deletePixels();
        canvasState.pixelData = {};
        setPixelSize(event.target.value);
        createPixelArtCanvas(canvasState.pixelSize);
    };

    function clearCanvas() {
        // TODO : 1) can we create an id for each pixel  --> canvasState.pixelData
        // Do we call reserCanvas here instead
        const pixelDivs = document.querySelectorAll(".pixel-div");
        canvasState.pixelData = {};
        pixelDivs.forEach(pixel => pixel.style.backgroundColor = "white");
    }

    function setColor(color) {
        currentColor = color;
    }

    function setMode(newMode) {
        canvasState.mode = newMode;
    }

    function setPixelSize(size) {
        canvasState.pixelSize = size;
        pixelSizeLabel.innerText = `${canvasState.pixelSize} x ${canvasState.pixelSize}`;
    }

    function deletePixels() {
        canvas.innerHTML = "";
    }

    function highlightButton(selectedButton) {
        [normalModeBtn, chaosModeBtn, eraseButton].forEach(button => {
            if (button === selectedButton) {
                button.classList.add("selected");
            } else {
                button.classList.remove("selected");
            }
        });
    }
});
