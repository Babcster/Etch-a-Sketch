const container = document.querySelector(".container");
const radioButtons = document.querySelectorAll('input[name="colorMode"]');
const resultDisplay = document.getElementById("result");
const clearButton = document.getElementById("clear-btn");
const sizeButton = document.getElementById("size-btn");

let getGridSize = 16;

function calcCellSize(int) {
  let size = 960 / int;
  return size;
}

let fullSize = getGridSize * getGridSize;
let gridSize = calcCellSize(getGridSize);
console.log(gridSize);

let currentMode = "black";
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

function createGrid() {
  container.inneHTML = "";

  for (let index = 0; index < fullSize; index++) {
    const cell = document.createElement("div");
    cell.style.boxSizing = "border-box";
    cell.style.width = gridSize + "px";
    cell.style.height = gridSize + "px";
    cell.style.border = "1px solid #0000FF";
    cell.dataset.opacityLevel = "0";
    container.appendChild(cell);

    cell.addEventListener("mouseover", () => {
      applyColorMode(currentMode, cell);
    });
  }
}

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
      cell.style.background = `rgb(0, 0, 0, ${newOpacity})`;
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
      gridSize = calcCellSize(getGridSize);
      fullSize = getGridSize * getGridSize;
      clearGrid();
    } else {
      alert("Please enter a number between 2 and 100.");
    }
  } else {
    alert("Invalid input. Please enter a number.");
  }
}

sizeButton.addEventListener("click", getSize);

clearButton.addEventListener("click", clearGrid);

window.onload = function () {
  createGrid();
};
