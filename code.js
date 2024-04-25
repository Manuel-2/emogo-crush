// game code

let candies = ["😀","🥶","😡","😈"];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game{
  constructor(width,height){
    // note: board stores collums that stores candies
    this.board = []
    this.width = width;
    this.height = height;

    this.buildGameBoard(width,height);
  }

  // pos.x is the column and pox.y is the row
  generateCandy(pos){
    let candyIndex = getRandomInt(0,3);
    let candy = candies[candyIndex];


    let downCandy = false;
    if(pos.y != 0){
      downCandy = this.board[pos.x][pos.y - 1];
    }
    
    let leftCandy = false;
    if(pos.x != 0){
      leftCandy = this.board[pos.x - 1][pos.y];
    }

    if(leftCandy == candy || downCandy == candy){
      return this.generateCandy(pos);
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

  // both parameters are only coordinates
  swap(selected,target){

  }

  pullCollumnsDown(){

  }
}


let boardElement = document.getElementById("board");
let game1 = new Game(6,8);

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










