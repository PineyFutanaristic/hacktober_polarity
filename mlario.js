let px = 20, py = 175;
let board;

function setup() {
  createCanvas(400, 200);
  board = new Array(10);
  for(let i = 0; i < 10; i++) {
    board[i] = new Array(20);
  }
  for(let i = 0; i < 20; i++) {
    board[9][i] = "block";
  }
}

function draw() {
  background(220);
  line(0, 180, 400, 180);
  ellipse(px, py, 10, 10);
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 20; j++) {
      if(board[i][j] == "block") {
        rect(j * 20, 180, 20, 20);
      }
    }
  }
  move();
}

function move() {
  if(keyIsDown(37)) {
    px--;
  }
  else if(keyIsDown(39)) {
    px++;
  }
}
