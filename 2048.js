const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d'); 

const tileSize = 100;
const playingFieldSize = 4;
canvas.width = playingFieldSize * 100;
canvas.height = playingFieldSize * 100;
let gridSize = [];

gridSize.length = playingFieldSize ** 2;
gridSize.fill(null);


function startGame() {
    createNewTile();
    createNewTile();
    showGrid();
    showTile();
}

function showGrid() {
context.clearRect(0, 0, 400, 400);
for (let i = 0; i < gridSize.length; i += 1) {
    const x = (i % playingFieldSize) * tileSize; 
    const y = Math.floor(i / playingFieldSize) * tileSize; 
    // console.log(4 % 4 *100)
    // console.log('x', x)
    // console.log('y', y)
    showTile(x, y, gridSize[i]);
   // createNewTile(x, y);
    };
};

//showGrid()

function showTile(x, y, gridValue) {
    // 
    context.strokeRect(x, y, tileSize, tileSize);
    // context.fillRect(x + 5, y + 5, tileSize - 10, tileSize - 10)
    context.fillStyle = '#cdc1b4'

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

    for (let i = 0; i < gridSize.length; i += 1 ) {
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

startGame();

function getColor(gridValue) {
    switch (gridValue) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f67c5f';
        case 128: return '#f9f38e';
        case 256: return '#edcf72';
        case 512: return '#edcc61';
        case 1024: return '#edc850';
        case 2048: return '#edc53f';
        default: return '#c2b3a0';
    }
}

  function mergeLeft() {
    for(let row = 0; row < 4; row++) {

       let startInd = row * 4

       let currentRow = gridSize.slice(startInd, startInd + 4)

       let newRow = currentRow.filter(value => value !== null)


        for(let i = 0; i < newRow.length - 1; i++) {
            if(newRow[i] === newRow[i+1]) {
                newRow[i] *= 2
                newRow.splice(i + 1, 1)
           
          
            }
        }
      
       for (let i = 0; i < 4; i++) {
           gridSize[startInd + i] = newRow[i] || null 
        }
      }
      createNewTile()
    showGrid()
  //  return gridSize
    
    }

     function mergeRight() {
    for(let row = 0; row < 4; row++) {
      
       let startInd = row * 4
       
       let currentRow = gridSize.slice(startInd, startInd + 4)
       
       let newRow = currentRow.filter(value => value !== null)
       
       newRow.reverse()
      
    
        for(let i = 0; i < newRow.length - 1; i++) {
            if(newRow[i] === newRow[i+1]) {
                newRow[i] *= 2
                newRow.splice(i + 1, 1)
                
             
            }
        }
        newRow.reverse()
      
       
       for (let i = 0; i < 4; i++) {
            gridSize[startInd + (3-i)] = newRow.pop() || null 
        }
        
      }
    createNewTile()
    showGrid()
  //  return gridSize
    }


      function mergeUp() {
       const size = 4; 
    for (let col = 0; col < size; col++) {
        let writeIndex = 0; 
        let lastTile = undefined ; 

        for (let row = 0; row < size; row++) {
            const currentTile = gridSize[row * size + col]; 

            if (currentTile !== null) { 
                
                if (writeIndex === 0 || currentTile !== lastTile) {
                    gridSize[writeIndex * size + col] = currentTile; 
                    writeIndex++; 
                    lastTile = currentTile; 
                } else if (currentTile === lastTile) { 
                    
                    gridSize[(writeIndex - 1) * size + col] *= 2;  
                    gridSize[row * size + col] = null; 
                    lastTile = undefined;  
                }
            }
        }

     
        for (let i = writeIndex; i < size; i++) {
            gridSize[i * size + col] = null;
        }
    }
     createNewTile()
    showGrid()

 
   // return gridSize 
}

function mergeDown() {
    const size = 4; 
    for (let col = 0; col < size; col++) {
        let writeIndex = size - 1; 
        let lastTile = undefined; 

        for (let row = size - 1; row >= 0; row--) {
            const currentTile = gridSize[row * size + col]

            if (currentTile !== null) { 
            
                if (writeIndex === size - 1 || currentTile !== lastTile) {
                    gridSize[writeIndex * size + col] = currentTile
                    writeIndex-- 
                    lastTile = currentTile 
                } else if (currentTile === lastTile) { 
                   
                    gridSize[(writeIndex + 1) * size + col] *= 2; 
                    gridSize[row * size + col] = null
                    lastTile = undefined  
                }
            }
        }

     
        for (let i = writeIndex; i >= 0; i--) {
            gridSize[i * size + col] = null
        }
    }

 createNewTile()
    showGrid()
    //return gridSize
}
   
document.addEventListener('keydown', (event) => {
    const key = event.key;
    switch (key) {
        case 'ArrowUp': mergeUp(), console.log('Нажата клавиша "Вверх"!'); break;
        case 'ArrowDown': mergeDown();  console.log('Нажата клавиша "Вниз"!'); break;
        case 'ArrowLeft': mergeLeft(), console.log('Нажата клавиша "Влево"!'); break;
        case 'ArrowRight': mergeRight(), console.log('Нажата клавиша "Вправо"!'); break;
    }
});










