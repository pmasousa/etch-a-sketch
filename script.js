const gridContainer = document.querySelector('.grid-container');
let gridSize = 16; // Initial grid size 16
let gridItemsSize = '15px'; // Initial grid items size 15px
let paintColor = 'black'; // Initial paint color black

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function createGridItems() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < gridSize ** 2; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.style.padding = gridItemsSize;
        gridItem.setAttribute('dragable', false);
        gridItem.addEventListener('mousemove', (e) => {
            if (mouseDown) {
                e.target.style.backgroundColor = paintColor;
            }
        });
        gridContainer.appendChild(gridItem);
    }
}

createGridItems();

gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

function increaseGridSize() {
    if (gridSize == 16) {
        gridSize = 32;
        gridItemsSize = '7.5px' // 15/2
    } else if (gridSize == 32) {
        gridSize = 64;
        gridItemsSize = '3.75px'// 15/4
    } else {
        return;
    }
    createGridItems();
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}

function decreaseGridSize() {
    if (gridSize == 64) {
        gridSize = 32;
        gridItemsSize = '7.5px' // 15/2
    } else if (gridSize == 32) {
        gridSize = 16;
        gridItemsSize = '15px'// 15/4
    } else {
        return;
    }
    createGridItems();
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}

function resetGrid() {
    gridContainer.innerHTML = '';
    createGridItems();
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}

document.querySelector('.bigger-button').addEventListener('click', increaseGridSize);
document.querySelector('.clear-button').addEventListener('click', resetGrid);
document.querySelector('.smaller-button').addEventListener('click', decreaseGridSize);
document.querySelector('#color-input').addEventListener('input', (event) => {
    paintColor = event.target.value;
});
