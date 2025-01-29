const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d'); 

const tileSize = 100;
const playingFieldSize = 4;
canvas.width = playingFieldSize * 100;
canvas.height = playingFieldSize * 100;
let gridSize = [];

gridSize.length = playingFieldSize ** 2;
gridSize.fill(null);
// console.log(gridSize)

//[ 0,  1,  2,  3,
//  4,  5,  6,  7,
//  8,  9,  10, 11,
//  12, 13, 14, 15 ];

// Отрисовка поля 

function showGrid() {
context.clearRect(0, 0, 400, 400);
for (let i = 0; i < gridSize.length; i += 1) {
    const x = (i % playingFieldSize) * tileSize; 
    const y = Math.floor(i / playingFieldSize) * tileSize; 
    // console.log(4 % 4 *100)
    // console.log('x', x)
    // console.log('y', y)
    showTile(x, y, gridSize[i]);
    };
};

showGrid()

function showTile(x, y, gridValue) {
    context.fillStyle = gridValue ? '#eee4da' : '#cdc1b4'; 
    context.strokeRect(x, y, tileSize, tileSize);
    if (gridValue) {
        context.strokeStyle = 'black';
        context.font = 'bold 36px Arial';
        context.textAlign = 'center';
        context.textBaseLine = 'middle';
        context.fillText(gridValue, x + tileSize / 2, y + tileSize / 2);
    };
};

console.log(gridSize)
function createNewTile() {
    let emptyTiles = [];
    min = 0;
    max = gridSize.length;

    for (let i = 0; i < gridSize.length; i +=1) {
        if (gridSize[i] === null) {
            emptyTiles.push(i)
        };
    };

    if (emptyTiles.length > 0) {
        const randomTile = Math.floor(Math.random() * (max - min) - min);
        const randomTilePosition = emptyTiles[randomTile];
        console.log(randomTilePosition)
        gridSize[randomTilePosition] = Math.random() < 0.9 ? 2 : 4;
    };
};
createNewTile();

// createNewTile()






