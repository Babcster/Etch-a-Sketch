const container = document.querySelector(".container");
const radioButtons = document.querySelectorAll('input[name="colorMode"]');
const resultDisplay = document.getElementById("result");
const clearButton = document.getElementById("clear-btn");
const sizeButton = document.getElementById("size-btn");

let getGridSize = 16;
let currentMode = "black";

// Fix typo in createGrid and use dynamic cell size
function createGrid() {
  container.innerHTML = ""; // Fixed typo here

  const cellSize = container.offsetWidth / getGridSize;

  for (let index = 0; index < getGridSize * getGridSize; index++) {
    const cell = document.createElement("div");
    cell.style.boxSizing = "border-box";
    cell.style.width = cellSize + "px";
    cell.style.height = cellSize + "px";
    cell.style.border = "1px solid #9893a5";
    cell.dataset.opacityLevel = "0";
    container.appendChild(cell);

    cell.addEventListener("mouseover", () => {
      applyColorMode(currentMode, cell);
    });
  }
}

// Update existing grid cells' size on window resize
function updateGridSize() {
  const cellSize = container.offsetWidth / getGridSize;
  const cells = container.children;
  for (let cell of cells) {
    cell.style.width = cellSize + "px";
    cell.style.height = cellSize + "px";
  }
}

// Listen for window resize and update grid
window.addEventListener("resize", updateGridSize);

// Rest of your code remains mostly the same
radioButtons.forEach((radio) => {
  if (radio.checked) {
    currentMode = radio.value;
  }

  radio.addEventListener("change", function () {
    if (this.checked) {
      currentMode = this.value;
      console.log(`Selected color mode: ${currentMode}`);
      clearGrid();
    }
  });
});

function applyColorMode(mode, cell) {
  switch (mode) {
    case "black":
      cell.style.background = "black";
      break;
    case "rainbow":
      cell.style.backgroundColor = `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`;
      break;
    case "darkening":
      let currentOpacity = parseFloat(cell.dataset.opacityLevel);
      let newOpacity = Math.min(currentOpacity + 0.1, 1);
      cell.style.background = `rgba(0, 0, 0, ${newOpacity})`;
      cell.dataset.opacityLevel = newOpacity.toString();
      break;
    default:
      break;
  }
}

function clearGrid() {
  container.innerHTML = "";
  createGrid();
}

function randomRGB() {
  return Math.floor(Math.random() * 256);
}

function getSize() {
  let size = prompt(
    "Please enter the size of the Grid (between 2 and 100):",
    "16",
  );

  if (size !== null && size !== "" && !isNaN(size)) {
    size = parseInt(size);
    if (size >= 2 && size <= 100) {
      getGridSize = size;
      clearGrid(); // Recreate grid with new size
    } else {
      alert("Please enter a number between 2 and 100.");
    }
  } else {
    alert("Invalid input. Please enter a number.");
  }
}

sizeButton.addEventListener("click", getSize);
clearButton.addEventListener("click", clearGrid);
window.onload = createGrid;
