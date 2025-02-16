const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d'); 

const tileSize = 100;
const playingFieldSize = 4;
canvas.width = playingFieldSize * 100;
canvas.height = playingFieldSize * 100;
let gridSize = [];
gridSize.length = playingFieldSize ** 2;
gridSize.fill(null);

let score = 0;
let keyPressed = false;


function startGame() {
    createNewTile();
    createNewTile();
    showGrid();
    showTile();
}


function createNewTile() {
    let emptyTiles = gridSize.reduce((acc, curr, index) => {
        if (curr === null) acc.push(index);
        return acc;
    }, []);
    
    if (emptyTiles.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyTiles.length);
        let tilePosition = emptyTiles[randomIndex];
        gridSize[tilePosition] = Math.random() < 0.9 ? 2 : 4; 
    }
}

function showGrid() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gridSize.length; i++) {
        const x = (i % playingFieldSize) * tileSize; 
        const y = Math.floor(i / playingFieldSize) * tileSize; 
        showTile(x, y, gridSize[i]);
    }
}

function showTile(x, y, gridValue) {
    context.strokeRect(x, y, tileSize, tileSize);
    context.fillStyle = getColor(gridValue);
    context.fillRect(x, y, tileSize, tileSize);
    
    if (gridValue) {
        context.fillStyle = 'black';
        context.font = 'bold 36px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(gridValue, x + tileSize / 2, y + tileSize / 2);
    }
}

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
        default: return '#cdc1b4'; 
    }
}

  function mergeLeft() {
    points = 0
    const prevState = [...gridSize];
    for(let row = 0; row < 4; row++) {
       let startInd = row * 4
       let currentRow = gridSize.slice(startInd, startInd + 4)
       let newRow = currentRow.filter(value => value !== null)
        for(let i = 0; i < newRow.length - 1; i++) {
            if(newRow[i] === newRow[i+1]) {
                points += newRow[i] *= 2
              //  let newPoint = points += newRow[i] *= 2
                newRow.splice(i + 1, 1)
            }
        }
      
       for (let i = 0; i < 4; i++) {
           gridSize[startInd + i] = newRow[i] || null 
        }
      }
        if (JSON.stringify(prevState) !== JSON.stringify(gridSize)) {
        makeMove();
        createNewTile(); 
        showGrid();
        win();
        updateScore(points);
    } else {
        showGrid();
        makeMove()
    }

    }

     function mergeRight() {
        points = 0
        const prevState = [...gridSize];
    for(let row = 0; row < 4; row++) {
       let startInd = row * 4
       let currentRow = gridSize.slice(startInd, startInd + 4)
       let newRow = currentRow.filter(value => value !== null)
       newRow.reverse()
        for(let i = 0; i < newRow.length - 1; i++) {
            if(newRow[i] === newRow[i+1]) {
                //newRow[i] *= 2
                let value = newRow[i] *= 2
                points += value

                newRow.splice(i + 1, 1)
                
             
            }
        }
        newRow.reverse()
      
       
       for (let i = 0; i < 4; i++) {
            gridSize[startInd + (3-i)] = newRow.pop() || null 
        }
        
      }
      if (JSON.stringify(prevState) !== JSON.stringify(gridSize)) {
        makeMove();
        createNewTile(); 
        showGrid();
        win();
        updateScore(points);
    } else {
        showGrid();
        makeMove()
    }
    }


      function mergeUp() {
        let points = 0
        const prevState = [...gridSize];
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
                    
                   // gridSize[(writeIndex - 1) * size + col] *= 2;  
                   points += gridSize[(writeIndex - 1) * size + col] *= 2;
                  // points += (value/2)
                    gridSize[row * size + col] = null; 
                    lastTile = undefined;  
                }
            }
        }

        for (let i = writeIndex; i < size; i++) {
            gridSize[i * size + col] = null;
        }
    }
   if (JSON.stringify(prevState) !== JSON.stringify(gridSize)) {
        makeMove();
        createNewTile(); 
        showGrid();
        win();
        updateScore(points);
    } else {
        showGrid();
        makeMove()
    }
}

function mergeDown() {
    points = 0
    const prevState = [...gridSize];
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
                   
                    //gridSize[(writeIndex + 1) * size + col] *= 2;
                    points += gridSize[(writeIndex + 1) * size + col] *= 2;
                    gridSize[row * size + col] = null
                    lastTile = undefined  
                }
            }
        }

     
        for (let i = writeIndex; i >= 0; i--) {
            gridSize[i * size + col] = null
        }
    }
    if (JSON.stringify(prevState) !== JSON.stringify(gridSize)) {
        makeMove();
        createNewTile(); 
        showGrid();
        win();
        updateScore(points);
    } else {
        showGrid();
        makeMove()
    }
}
   
window.addEventListener('keydown', function(event) {
    if (!keyPressed) {
        switch (event.key) {
            case 'ArrowUp':
                mergeUp();
                break;
            case 'ArrowDown':
                mergeDown();
                break;
            case 'ArrowLeft':
                mergeLeft();
                break;
            case 'ArrowRight':
                mergeRight();
                break;
            default:
                return; 
        }
        keyPressed = true; 
    }
});

window.addEventListener('keyup', function(event) {
    keyPressed = false; 
});

 
startGame();

function gameOver() {
    if(gridSize.includes(null)) {
        return false;
    }
    for(let i = 0; i < gridSize.length; i++) {
        if((i + 1) % 4 !== 0 && gridSize[i] === gridSize[i + 1]) {
            return false
        }
        if(i + 4 < gridSize.length && gridSize[i] === gridSize[i + 4]) {
            return false
        }

    }
    return true
}

gameOver()
const lose = document.querySelector('.gmHidden')
function makeMove() {
   
    if (gameOver()) {
        console.log("Игра окончена!");
       // alert('Игра окончена')
        lose.style.visibility = 'visible'

        
    } else {
       // console.log("Игра продолжается!");
    }
   // console.log(gridSize)
}
makeMove()

const tryAgain = document.querySelector('.tryAgain')
tryAgain.addEventListener('click', (e) => {
    location.reload()
})

const winner = document.querySelector('.winHidden')
function win() {
    if(gridSize.includes(2048)) {
        winner.style.visibility = 'visible'

    }
}

const play = document.querySelector('.play')
play.addEventListener('click', (e) => {
    location.reload()
})
//gridSize[0] = 2048

function updateScore(points) {
    score += points
    document.querySelector('.value').innerText = score
}

