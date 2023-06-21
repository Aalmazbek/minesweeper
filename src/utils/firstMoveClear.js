export const firstMoveClear = (x, y, arr) => {
  arr[x][y].value = 0;
  let minesCount = 0

  if (x > 0 && y > 0) {
    arr[x - 1][y - 1].value = 1;
  }

  if (x > 0) {
    arr[x - 1][y].value = 1;
  }

  if (x > 0 && y < arr[x].length - 1) {
    arr[x - 1][y + 1].value = 1;
  }

  if (y > 0) {
    arr[x][y - 1].value = 1;
  }

  if (y < arr[x].length - 1) {
    arr[x][y + 1].value = 1;
  }

  if (x < arr.length - 1 && y > 0) {
    arr[x + 1][y - 1].value = 1;
  }

  if (x < arr.length - 1) {
    arr[x + 1][y].value = 1;
  }

  if (x < arr.length - 1 && y < arr[x].length - 1) {
    arr[x + 1][y + 1].value = 1;
  }

  arr.forEach((row, index, array) => row.forEach(elem => {
    if (elem.value === 'X') {
      minesCount++
    }

    if (elem.value !== 'X') {
      elem.value = findValue(elem.x, elem.y, array)
    }
  }))


  return {arr, minesCount};
};

const findValue = (x, y, arr) => {
  let value = 0;
  if (x > 0 && y > 0 && arr[x - 1][y - 1].value === "X") {
    value += 1;
  }

  if (x > 0 && arr[x - 1][y].value === "X") {
    value += 1;
  }

  if (x > 0 && y < arr[x].length - 1 && arr[x - 1][y + 1].value === "X") {
    value += 1;
  }

  if (y > 0 && arr[x][y - 1].value === "X") {
    value += 1;
  }

  if (y < arr[x].length - 1 && arr[x][y + 1].value === "X") {
    value += 1;
  }

  if (x < arr.length - 1 && y > 0 && arr[x + 1][y - 1].value === "X") {
    value += 1;
  }

  if (x < arr.length - 1 && arr[x + 1][y].value === "X") {
    value += 1;
  }

  if (
    x < arr.length - 1 &&
    y < arr[x].length - 1 &&
    arr[x + 1][y + 1].value === "X"
  ) {
    value += 1;
  }

  return value;
};
