document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const normalModeBtn = document.getElementById("color-normal");
    const colorPicker = document.getElementById("color-picker");
    const chaosModeBtn = document.getElementById("color-chaos");
    const pixelSizeInput = document.getElementById("pixel-size");
    const clearButton = document.getElementById("clear");
    const eraseButton = document.getElementById("eraser");
    const pixelSizeLabel = document.getElementById("pixel-size");

    let pixelSize = Number.parseInt(pixelSizeInput.value, 10);
    let mouseDown = false;
    let currentColor = "#000000"; // Default color black
    let mode = "normal";

    createPixelArtCanvas(pixelSize);

    canvas.addEventListener("mouseup", () => { mouseDown = false; });
    canvas.addEventListener("mousedown", () => { mouseDown = true; });

    normalModeBtn.addEventListener("click", handleNormalModeButtonClick);
    colorPicker.addEventListener("input", handleColorPickerInputChange);

    chaosModeBtn.addEventListener("click", handleChaosModeButtonClick);

    eraseButton.addEventListener("click", handleEraseButtonClick);
    clearButton.addEventListener("click", clearCanvas);

    pixelSizeInput.addEventListener("input", handlePixelSizeInputChange);

    function createPixelArtCanvas(pixelSize) {
        let count = Math.floor(canvas.clientHeight / pixelSize);
        for (let index = 0; index < count * count; index++) {
            const pixelDiv = document.createElement("div");

            pixelDiv.style.width = `${pixelSize}px`;
            pixelDiv.style.height = `${pixelSize}px`;
            pixelDiv.classList.add("pixel-div");

            canvas.appendChild(pixelDiv);

            pixelDiv.addEventListener("click", drawPixel);
            pixelDiv.addEventListener("mouseenter", drawPixel);
        }
    }

    function drawPixel(event) {
        if (mode === "chaos") {
            setColor("#" + (Math.random() * 0xFFFFFF << 0).toString(16));
        } else if (mode === "erase") {
            setColor("white");
        }
        if (event.type === "click" || (event.type === "mouseenter" && mouseDown)) {
            event.target.style.backgroundColor = currentColor;
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

    function handlePixelSizeInputChange(event) {
        deletePixels();
        setPixelSize(event.target.value);
        createPixelArtCanvas(pixelSize);
    };

    function clearCanvas() {
        const pixelDivs = document.querySelectorAll(".pixel-div");
        pixelDivs.forEach(pixel => pixel.style.backgroundColor = "white");
    }

    function setColor(color) {
        currentColor = color;
    }

    function setMode(newMode) {
        mode = newMode;
    }

    function setPixelSize(size) {
        pixelSize = size;
        pixelSizeLabel.innerText = `${pixelSize} x ${pixelSize}`;
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
