// game code

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game{
  constructor(width,height,candies,clearLineSize){
    // note: board stores collums that stores candies
    this.board = []
    this.width = width;
    this.height = height;
    this.candies = candies;
    this.clearLineSize = clearLineSize;

    this.buildGameBoard(width,height);
  }

  // pos.x is the column and pox.y is the row
  generateCandy(pos){
    let candyIndex = getRandomInt(0,3);
    let candy = this.candies[candyIndex];

    let repeatedLeftCandyCount = 0;
    let repeatedDownCandyCount = 0;

    for(let i = 1;i<this.clearLineSize;i++){
      let downICandy = this.board[pos.x][pos.y - i];
      if(downICandy == candy){
        repeatedDownCandyCount++;
      }else{
        break;
      } 
    }
    for(let i = 1;i<this.clearLineSize;i++){
      let leftICandy = false;
      if(this.board[pos.x - i]){
        leftICandy = this.board[pos.x -i][pos.y];
      }
      if(leftICandy == candy){
        repeatedLeftCandyCount++;
      }else{
        break;
      } 
    }
     
    if(repeatedLeftCandyCount >= this.clearLineSize -1){
      candy = this.generateCandy(pos);
    }
    if(repeatedDownCandyCount >= this.clearLineSize -1){
      candy = this.generateCandy(pos);
    }

    return candy; 
    }

  buildGameBoard(width,height){
    for(let x = 0; x < width;x++){
      let collumn = [];
      this.board.push(collumn);
      for(let y = 0;y < height;y++){
        let candy = this.generateCandy({x,y});
        collumn.push(candy);
      }
    } 
  }

  // both parameters are only coordinates x and y
  swap(selected,target){
    let aux = this.board[target.x][target.y];
    // set target to selected
    this.board[target.x][target.y] = this.board[selected.x][selected.y];
    // set selected to target;
    this.board[selected.x][selected.y] = aux;
   
    // check for a clear
  }

  pullCollumnsDown(){

  }
}

let set1 = ["😀","🥶","😡","😈"];
let boardElement = document.getElementById("board");
let game1 = new Game(6,8,set1,3);

for( let column = 0;column<6;column++){
  let columnElement = document.createElement("div");
  columnElement.classList.add("column");
  for (let row = 0 ;row < 8;row++){
    let candyElement = document.createElement("span"); 
    candyElement.classList.add("item");
    candyElement.innerText = game1.board[column][row];
    columnElement.append(candyElement);
  }
  boardElement.append(columnElement);
}
