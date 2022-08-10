// variables
const colorInput = document.querySelector('#colorInput');
const colorModeBtn = document.querySelector('#colorMode');
const rainbowModeBtn = document.querySelector('#rainbowMode');
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');
const rangeInput = document.querySelector('#range');
const gridArea = document.querySelector('#grid');
const sizeValueLabel = document.querySelector('#sizeValue');
// defaults
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#4E5166';
const DEFAULT_MODE = 'color';
//
let currColor = DEFAULT_COLOR;
let currSize = DEFAULT_SIZE;
let currMode = DEFAULT_MODE;
// set
const setNewSize = function (newSize) {
  currSize = newSize;
};
const setNewColor = function (newColor) {
  currColor = newColor;
};
const setNewMode = function (newMode) {
  activateBtn(newMode);
  currMode = newMode;
};
//
colorInput.oninput = (e) => setNewColor(e.target.value);
colorModeBtn.onclick = () => setNewMode('color');
rainbowModeBtn.onclick = () => setNewMode('rainbow');
eraserBtn.onclick = () => setNewMode('eraser');
clearBtn.onclick = () => reloadGrid();
rangeInput.onmousemove = (e) => updateSizeValue(e.target.value);
rangeInput.onchange = (e) => changeSize(e.target.value);
// keep the track of clicks
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
// cleaning the grid
const reloadGrid = function () {
  clearGrid();
  setupGrid(currSize);
};
// changing the size of the grid
const changeSize = function (val) {
  setNewSize(val);
  updateSizeValue(val);
  reloadGrid();
};
// updating the label of the grid's size
const updateSizeValue = function (val) {
  sizeValueLabel.innerHTML = `${val} x ${val}`;
};
// clearing the grid
const clearGrid = function () {
  gridArea.innerHTML = '';
};
// seting up the grid
const setupGrid = function (size) {
  gridArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridArea.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    gridElement.addEventListener('mouseover', changeColor);
    gridElement.addEventListener('mousedown', changeColor);
    gridArea.appendChild(gridElement);
  }
};
// changing the colors
const changeColor = function (e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currMode === 'rainbow') {
    const randR = Math.floor(Math.random() * 256);
    const randG = Math.floor(Math.random() * 256);
    const randB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randR}, ${randG}, ${randB})`;
  } else if (currMode === 'color') {
    e.target.style.backgroundColor = currColor;
  } else if (currMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe';
  }
};
const activateBtn = function (newMode) {
  if (currMode === 'rainbow') {
    rainbowModeBtn.classList.remove('active_');
  } else if (currMode === 'color') {
    colorModeBtn.classList.remove('active_');
  } else if (currMode === 'eraser') {
    eraserBtn.classList.remove('active_');
  }
  if (newMode === 'rainbow') {
    rainbowModeBtn.classList.add('active_');
  } else if (newMode === 'color') {
    colorModeBtn.classList.add('active_');
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active_');
  }
};
window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateBtn(DEFAULT_MODE);
};
