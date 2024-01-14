var size = 4;
var htmlElements;
var cells;

const CELL_COLORS = [
  { value: 0, color: "#fff", background: "#ccc0b3" },
  { value: 2, color: "#776E65", background: "#eee4da" },
  { value: 4, color: "#776E65", background: "#ede0c8" },
  { value: 8, color: "#FFF", background: "#f2b179" },
  { value: 16, color: "#FFF", background: "#f59563" },
  { value: 32, color: "#FFF", background: "#f67c5f" },
  { value: 64, color: "#FFF", background: "#f65e3b" },
  { value: 128, color: "#FFF", background: "#edcf72" },
  { value: 256, color: "#FFF", background: "#edcc61" },
  { value: 512, color: "#FFF", background: "#edc850" },
  { value: 1024, color: "#FFF", background: "#edc53f" },
  { value: 2048, color: "#FFF", background: "#edc22e" },
];

function createField() {
  if (htmlElements) {
    return;
  }
  htmlElements = [];
  var table = document.getElementById("board");
  for (var y = 0; y < size; y++) {
    var tr = document.createElement("tr");
    var trElements = [];
    for (var x = 0; x < size; x++) {
      var td = document.createElement("td");
      td.setAttribute("class", "cell");
      tr.appendChild(td);
      trElements.push(td);
    }
    htmlElements.push(trElements);
    table.appendChild(tr);
  }
}

function createCells() {
  cells = [];
  for (var y = 0; y < size; y++) {
    cells.push(new Array(size).fill(0));
  }
}

function generateInEmptyCell() {
  var x, y;
  do {
    (x = Math.floor(Math.random() * size)),
      (y = Math.floor(Math.random() * size));
    if (cells[y][x] == 0) {
      cells[y][x] = Math.random() >= 0.9 ? 4 : 2;
      break;
    }
  } while (true);
}
function getColorCell(cellValue) {
  return CELL_COLORS.find((cell) => cell.value === cellValue);
}
function draw() {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var td = htmlElements[y][x];
      var v = cells[y][x];
      td.innerHTML = v == 0 ? "" : String(v);
      const cell = getColorCell(v);

      td.style.backgroundColor = cell.background;
      td.style.color = cell.color;
    }
  }
}

function slide(array, size) {
  // [0, 2, 2, 2] => [2, 2, 2] => [4, 0, 2] => [4, 2] => [4, 2, 0, 0]
  function filterEmpty(a) {
    return a.filter((x) => x != 0);
  }

  array = filterEmpty(array);
  if (array.length > 0) {
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] == array[i + 1]) {
        array[i] *= 2;
        array[i + 1] = 0;
      }
    }
  }
  array = filterEmpty(array);
  while (array.length < size) {
    array.push(0);
  }
  return array;
}

function slideLeft() {
  var changed = false;
  for (var y = 0; y < size; y++) {
    var old = Array.from(cells[y]);
    cells[y] = slide(cells[y], size);
    changed = changed || cells[y].join(",") != old.join(",");
  }
  return changed;
}

function swap(x1, y1, x2, y2) {
  var tmp = cells[y1][x1];
  cells[y1][x1] = cells[y2][x2];
  cells[y2][x2] = tmp;
}

function mirror() {
  for (var y = 0; y < size; y++) {
    for (var xLeft = 0, xRight = size - 1; xLeft < xRight; xLeft++, xRight--) {
      swap(xLeft, y, xRight, y);
    }
  }
}

function transpose() {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < y; x++) {
      swap(x, y, y, x);
    }
  }
}

function moveLeft() {
  return slideLeft();
}

function moveRight() {
  mirror();
  var changed = moveLeft();
  mirror();
  return changed;
}

function moveUp() {
  transpose();
  var changed = moveLeft();
  transpose();
  return changed;
}

function moveDown() {
  transpose();
  var changed = moveRight();
  transpose();
  return changed;
}

function isGameOver() {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      if (cells[y][x] == 0) {
        return false;
      }
    }
  }
  for (var y = 0; y < size - 1; y++) {
    for (var x = 0; x < size - 1; x++) {
      var c = cells[y][x];
      if (c != 0 && (c == cells[y + 1][x] || c == cells[y][x + 1])) {
        return false;
      }
    }
  }
  return true;
}

document.addEventListener("keydown", function (e) {
  console.log(e);
  var code = e.keyCode;
  var ok;
  switch (code) {
    case 40:
    case 83:
      ok = moveDown();
      break;
    case 38:
    case 87:
      ok = moveUp();
      break;
    case 37:
    case 65:
      ok = moveLeft();
      break;
    case 39:
    case 68:
      ok = moveRight();
      break;
    default:
      return;
  }
  if (ok) {
    generateInEmptyCell();
    draw();
  }
  if (isGameOver()) {
    setTimeout(function () {
      alert("Game over");
      init();
    }, 1000);
  }
});

function init() {
  createField();
  createCells();
  new Array(3).fill(0).forEach(generateInEmptyCell);
  draw();
}

init();
