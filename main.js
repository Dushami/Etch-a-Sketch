//set default perametres//
const defaultColor = '#333'
const defaultMode = 'color'
const defaultGridSize = '16'

let activeColor = defaultColor
let activeMode = defaultMode
let currentGrid = defaultGridSize

window.onload = () => {
    setCurrentGrid(defaultGridSize);
    setActiveMode(defaultMode);
}

//declarations and adjustments
function setActiveColor(newColor){
    activeColor = newColor
}

function setActiveMode(newMode){
    activateMode(newMode);
    activeMode = newMode
}

function setCurrentSize(newGrid){
    currentGrid = newGrid
}

const colorPicker = document.querySelector('.colorWheel');
const colorMode = document.querySelector('.color');
const rainbowMode = document.querySelector('.rainbow');
const eraserMode = document.querySelector('.eraser');
const clearMode = document.querySelector('.clear');
const sizeText = document.querySelector('.size');
const slider = document.querySelector('.gridSize');
const grid = document.querySelector('.grid');

colorPicker.oninput = (e) => setActiveColor(e.target.value)
colorMode.onclick = () => setActiveMode('color')
rainbowMode.onclick = () => setActiveMode('rainbow')
eraserMode.onclick = () => setActiveMode('eraser')
clearMode.onclick = () => reloadGrid()
slider.onmousemove = (e) => changeValue(e.target.value)
slider.onchange = (e) => setupGrid(e.target.value)

//UI changing functions
function setCurrentGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    for (let i = 0; i < size * size; i++){
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}

function setupGrid(value){
    setCurrentSize(value);
    changeValue(value);
    reloadGrid();
}

function changeValue(size){
    sizeText.innerHTML = `${size} x ${size}`;
}

//Logic functions and declerations
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(newColor) {
    if (newColor.type === 'mouseover' && !mouseDown) return
    if (activeMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        newColor.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    else if (activeMode === 'color'){
        newColor.target.style.backgroundColor = activeColor
    }
    else if (activeMode === 'eraser'){
        newColor.target.style.backgroundColor = '#fefefe'
    }
}

function activateMode(newMode){
    if (activeMode === 'rainbow'){
        rainbowMode.classList.remove('active')
    } else if (activeMode === 'color'){
        colorMode.classList.remove('active')
    } else if (activeMode === 'eraser') {
        eraserMode.classList.remove('active');
    }

    if (newMode === 'rainbow'){
        rainbowMode.classList.add('active')
    } else if (newMode === 'color'){
        colorMode.classList.add('active')
    } else if (newMode === 'eraser'){
        eraserMode.classList.add('active')
    }
}

function clearGrid(){
    grid.innerHTML = ''
}

function reloadGrid(){
    clearGrid();
    setCurrentGrid(currentGrid);
}