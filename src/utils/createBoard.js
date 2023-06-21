export default (rows, cols, bombs) => {
  let board = [];
  let minesLocation = [];

  //x=column
  for (let x = 0; x < rows; x++) {
    let subCol = [];
    for (let y = 0; y < cols; y++) {
      let neighbours = []

      //Top
      if (x > 0) {
        neighbours.push({x: x-1, y: y})
      }

      //TopRight
      if (x > 0 && y < cols - 1) {
        neighbours.push({x: x-1, y: y+1})
      }

      //Right
      if (y < cols - 1) {
        neighbours.push({x: x, y: y+1})
      }

      //BottomRight
      if (x < rows - 1 && y < cols - 1) {
        neighbours.push({x: x+1, y: y+1})
      }

      //Bottom
      if (x < rows - 1) {
        neighbours.push({x: x+1, y: y})
      }

      //BottomLeft
      if (x < rows - 1 && y > 0) {
        neighbours.push({x: x+1, y: y-1})
      }

      //Left
      if (y > 0) {
        neighbours.push({x: x, y: y-1})
      }

      //TopLeft
      if (x > 0 && y > 0) {
        neighbours.push({x: x-1, y: y-1})
      }

      subCol.push({
        value: 0,
        revealed: false,
        neighbours,
        x,
        y,
        flagged: false,
      });
    }
    board.push(subCol);
  }

  let bombsCount = 0;
  while (bombsCount < bombs) {
    let x = randomNum(0, rows - 1);
    let y = randomNum(0, cols - 1);

    if (board[x][y].value === 0) {
      board[x][y].value = "X";
      minesLocation.push([x, y]);
      bombsCount++;
    }
  }

  for (let roww = 0; roww < rows; roww++) {
    for (let coll = 0; coll < cols; coll++) {
      if (board[roww][coll].value === "X") {
        continue;
      }

      //Top
      if (roww > 0 && board[roww - 1][coll].value === "X") {
        board[roww][coll].value++;
      }

      //TopRight
      if (
        roww > 0 &&
        coll < cols - 1 &&
        board[roww - 1][coll + 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      //Right
      if (coll < cols - 1 && board[roww][coll + 1].value === "X") {
        board[roww][coll].value++;
      }

      //BottomRight
      if (
        roww < rows - 1 &&
        coll < cols - 1 &&
        board[roww + 1][coll + 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      //Bottom
      if (roww < rows - 1 && board[roww + 1][coll].value === "X") {
        board[roww][coll].value++;
      }

      //BottomLeft
      if (
        roww < rows - 1 &&
        coll > 0 &&
        board[roww + 1][coll - 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      //Left
      if (coll > 0 && board[roww][coll - 1].value === "X") {
        board[roww][coll].value++;
      }

      //TopLeft
      if (roww > 0 && coll > 0 && board[roww - 1][coll - 1].value === "X") {
        board[roww][coll].value++;
      }
    }
  }

  return { board, minesLocation }
};

const randomNum = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
