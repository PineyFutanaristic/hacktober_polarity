let px = 20, py = 170;
let board;
let velo = 0;
let status = "walk";

function setup() {
  createCanvas(400, 200);
  board = new Array(10);
  for(let i = 0; i < 10; i++) {
    board[i] = new Array(20);
  }
  for(let i = 0; i < 20; i++) {
    board[9][i] = "block";
  }
  board[5][10] = "block";
}

function draw() {
  background(220);
  line(0, 180, 400, 180);
  push();
  rectMode(CENTER);
  rect(px, py, 20, 20);
  pop();
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 20; j++) {
      if(board[i][j] == "block") {
        rect(j * 20, i * 20, 20, 20);
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
    if(keyIsDown(37)) {
      px -= 2;
    }
    else if(keyIsDown(39)) {
      px += 2;
    }
}

function keyPressed() {
  if(keyCode == 38 && status == "walk") {
    velo = 7;
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
