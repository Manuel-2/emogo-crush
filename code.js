// game code

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game {
  constructor(width, height, candies, clearLineSize,renderCallback) {
    // note: board stores collums that stores candies
    this.board = [];
    this.width = width;
    this.height = height;
    this.candies = candies;
    this.clearLineSize = clearLineSize;
    this.renderCallback = renderCallback;

    this.buildGameBoard(width, height);
  }

  // pos.x is the column and pox.y is the row
  generateCandy(pos) {
    let candyIndex = getRandomInt(0, 3);
    let candy = this.candies[candyIndex];

    let repeatedLeftCandyCount = 0;
    let repeatedDownCandyCount = 0;

    for (let i = 1; i < this.clearLineSize; i++) {
      let downICandy = this.board[pos.x][pos.y - i];
      if (downICandy == candy) {
        repeatedDownCandyCount++;
      } else {
        break;
      }
    }
    for (let i = 1; i < this.clearLineSize; i++) {
      let leftICandy = false;
      if (this.board[pos.x - i]) {
        leftICandy = this.board[pos.x - i][pos.y];
      }
      if (leftICandy == candy) {
        repeatedLeftCandyCount++;
      } else {
        break;
      }
    }

    if (repeatedLeftCandyCount >= this.clearLineSize - 1) {
      candy = this.generateCandy(pos);
    }
    if (repeatedDownCandyCount >= this.clearLineSize - 1) {
      candy = this.generateCandy(pos);
    }

    return candy;
  }

  buildGameBoard(width, height) {
    for (let x = 0; x < width; x++) {
      let collumn = [];
      this.board.push(collumn);
      for (let y = 0; y < height; y++) {
        let candy = this.generateCandy({ x, y });
        collumn.push(candy);
      }
    }
  }

  // both parameters are only coordinates x and y
  swap(selectedPos, targetPos) {
    let aux = this.board[targetPos.x][targetPos.y];
    // set target to selected
    this.board[targetPos.x][targetPos.y] =
      this.board[selectedPos.x][selectedPos.y];
    // set selected to target;
    this.board[selectedPos.x][selectedPos.y] = aux;
  }

  // returns true if is a posible move
  move(selectedPos, targetPos) {
    if (
      Math.abs(targetPos.x - selectedPos.x) > 1 ||
      Math.abs(targetPos.y - selectedPos.y) > 1
    )
      return "ilegalMove";

    this.swap(selectedPos, targetPos);
    if (this.canCleanLine(targetPos) || this.canCleanLine(selectedPos)) {
      // disapear and bring down all the rows above
      
      this.renderCallback(this.board);
      return "clear";
      
    } else {
      // add an efect or something
      this.swap(selectedPos, targetPos);
      return "nothing";
    }
  }

  pullCandiesDown() {}

  canCleanLine(pos) {
    let verticalAdyacentCount = 1;
    let last;
    for (let y = 0; y < this.height; y++) {
      let candy = this.board[pos.x][y];
      if (y == 0) {
        last = candy;
        continue;
      }
      if (last == candy) {
        verticalAdyacentCount++;
        if (
          verticalAdyacentCount >= this.clearLineSize &&
          this.board[pos.x][y + 1] != candy
        ) {
          break;
        }
      } else {
        verticalAdyacentCount = 1;
      }
      last = candy;
    }

    let HorizontalAdyacentCount = 1;
    for (let x = 0; x < this.width; x++) {
      let candy = this.board[x][pos.y];
      if (x == 0) {
        last = candy;
        continue;
      }
      if (candy == last) {
        HorizontalAdyacentCount++;
        if (
          HorizontalAdyacentCount >= this.clearLineSize &&
          this.board[x + 1] && this.board[x + 1][pos.y] != candy
        ) {
          break;
        }
      } else {
        HorizontalAdyacentCount = 1;
      }
      last = this.board[x][pos.y];
    }
    return (
      verticalAdyacentCount >= this.clearLineSize ||
      HorizontalAdyacentCount >= this.clearLineSize
    );
  }
}

let set1 = ["😀", "🥶", "🤡", "😈"];
let boardElement = document.getElementById("board");
let game1 = new Game(6, 8, set1, 3);

let selectedItems = [,];

boardElement.addEventListener("click", (event) => {
  let { target } = event;
  if (!target.classList.contains("item")) return;
  let itemPos = JSON.parse(event.target.dataset.pos);
  if (!selectedItems[0]) {
    selectedItems[0] = itemPos;
  } else {
    selectedItems[1] = itemPos;
    let resutl = makeMove(selectedItems[0], selectedItems[1]);
    selectedItems[0] = null;
    selectedItems[1] = null;
  }
});

let renderMatrix = [];
for (let column = 0; column < 6; column++) {
  let columnElement = document.createElement("div");
  columnElement.classList.add("column");
  let renderColumn = [];
  for (let row = 0; row < 8; row++) {
    let candyElement = document.createElement("span");
    candyElement.classList.add("item");
    candyElement.innerText = game1.board[column][row];
    candyElement.dataset.pos = `{"x":${column},"y":${row}}`;
    columnElement.append(candyElement);
    renderColumn.push(candyElement);
  }
  renderMatrix.push[columnElement];
  boardElement.append(columnElement);
}

function makeMove(selected, target) {
  console.log(game1.move(selected, target));
}

function renderUpdate(gameBoard){
  renderMatrix.forEach((column,x) =>{
    column.forEach((item,y) =>{
      item.innerText = gameBoard[x][y];
    })
  })
}
