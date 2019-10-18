let px = 120, py = 270;
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
  board[9][17] = "block";
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
  if(velo == 0 && checkGround()) status = "walk";
  else status = "fly";
  move();
  if(status == "fly") fly();
  fix();
}

function move() {
    if(keyIsDown(37) && px > 110) {
      px -= 2;
    }
    else if(keyIsDown(39) && px < 490) {
      px += 2;
    }
}

function keyPressed() {
  if(keyCode == 38 && status == "walk") {
    velo = 8;
    status = "fly";
  }
}

function fly() {
  py -= velo;
  velo -= 1 / 4;
}

function fix() {
  if(py > floor(py / 20) * 20 + 10 && checkGround() && velo < 0) {
    py = floor(py / 20) * 20 + 10;
    status = "walk";
    velo = 0;
  }
}

function checkGround() {
  let bottomLeftCell = board[floor(py / 20) + 1][floor((px - 10) / 20)];
  let bottomRightCell = board[floor(py / 20) + 1][floor((px + 10) / 20)];
  return (bottomLeftCell == "block" || bottomRightCell == "block");
}

function canvasVal(a) {
  return a - 100;
}
