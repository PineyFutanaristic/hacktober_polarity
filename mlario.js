let px = 140, py = 200;
let board;
let velo = 0;
let status = "walk";


function setup() {
  createCanvas(400, 200);
  board = new Array(15);
  for(let i = 0; i < 15; i++) {
    board[i] = new Array(25);
  }
  for(let i = 0; i < 25; i++) {
    board[14][i] = "block";
  }
  for(let i = 0; i < 15; i++) {
    board[i][5] = "block";
    board[i][24] = "block";
  }
  board[9][17] = "block";
  board[7][12] = "block";
}

function draw() {
  background(220);
  line(0, 180, 400, 180);
  push();
  rectMode(CENTER);
  fill(50, 100, 150);
  rect(canvasVal(px), canvasVal(py), 20, 20);
  pop();
  for(let i = 0; i < 15; i++) {
    for(let j = 0; j < 25; j++) {
      if(board[i][j] == "block") {
        rect(canvasVal(j * 20), canvasVal(i * 20), 20, 20);
      }
    }
  }
  if(velo == 0 && bottomCheck()) status = "walk";
  else status = "fly";
  move();
  if(status == "fly") fly();
  fix();
}

function move() {
    if(keyIsDown(37) && !leftCheck()) {
      px -= 2;
    }
    else if(keyIsDown(39) && !rightCheck()) {
      px += 2;
    }
}

function keyPressed() {
  if(keyCode == 38 && status == "walk") {
    velo = 7.5;
    status = "fly";
  }
}

function fly() {
  py -= velo;
  velo -= 1 / 4;
}

function fix() {
  if(py > floor(py / 20) * 20 + 10 && bottomCheck() && velo < 0) {
    py = floor(py / 20) * 20 + 10;
    status = "walk";
    velo = 0;
  }
}

function bottomCheck() {
  let bottomLeftCell = board[floor(py / 20) + 1][floor((px - 8) / 20)];
  let bottomRightCell = board[floor(py / 20) + 1][floor((px + 8) / 20)];
  return bottomLeftCell == "block" || bottomRightCell == "block";
}

function leftCheck() {
  return board[floor(py / 20)][floor((px - 10) / 20)] == "block";
}

function rightCheck() {
  return board[floor(py / 20)][floor((px + 10) / 20)] == "block";
}

function canvasVal(a) {
  return a - 100;
}
