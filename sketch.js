const width = 600;
const height = 400;
const ballWidth = 20;
const ballSpeed = 5;
const paddleSpeed = 5;
const clearance = 10;
const ballAcc = 1.0001;
const waitTime = 15;
const p1Score = document.getElementById("p1");
const p2Score = document.getElementById("p2");
let playerOneScore = 0;
let playerTwoScore = 0;

let ball;
let paddle1;
let paddle2;
let i = 0;
let j = waitTime;

function setup() {
    createCanvas(width, height);
    ball = new Ball(300, 200, ballWidth, ballSpeed);
    paddle1 = new Paddle(30, height / 2, 20, 60);
    paddle2 = new Paddle(width - 30, height / 2, 20, 60);
}

function draw() {
    background(51);
    p1Score.innerHTML = `Player One: ${playerOneScore}`;
    p2Score.innerHTML = `Player Two: ${playerTwoScore}`;
    ball.draw();
    paddle1.draw();
    paddle2.draw();

    if (j === 0) {
        ball.loc.add(ball.vel);
        ball.vel.mult(ballAcc);
    }
    if (j > 0) {
        j -= 1;
    }

    if (ball.loc.x > width - ball.width / 2) {
        playerOneScore += 1;
        ball.reset();
        paddle1.reset();
        paddle2.reset();
        j = waitTime;
    }
    if (ball.loc.x < ball.width / 2) {
        playerTwoScore += 1;
        ball.reset();
        paddle1.reset();
        paddle2.reset();
        j = waitTime;
    }
    if (ball.loc.y > height - ball.width / 2 || ball.loc.y < ball.width / 2) {
        ball.vel.y *= -1;
    }

    if (keyIsDown(87)) {
        if (!(paddle1.loc.y < paddle1.height / 2 + clearance)) {
            paddle1.loc.y -= paddleSpeed;
        }
    }
    if (keyIsDown(83)) {
        if (!(paddle1.loc.y > height - clearance - paddle1.height / 2)) {
            paddle1.loc.y += paddleSpeed;
        }
    }
    if (keyIsDown(UP_ARROW)) {
        if (!(paddle2.loc.y < paddle2.height / 2 + clearance)) {
            paddle2.loc.y -= paddleSpeed;
        }
    }
    if (keyIsDown(DOWN_ARROW)) {
        if (!(paddle2.loc.y > height - clearance - paddle2.height / 2)) {
            paddle2.loc.y += paddleSpeed;
        }
    }

    if ((collision(ball, paddle1) || collision(ball, paddle2)) && i === 0) {
        ball.vel.x *= -1;
        i = 10;
    }
    if (i > 0) {
        i -= 1;
    }
}

function collision(circle, paddle) {
    let cx = circle.loc.x;
    let cy = circle.loc.y;
    let px = paddle.loc.x;
    let py = paddle.loc.y;
    let halfPW = paddle.width / 2;
    let halfPH = paddle.height / 2;
    let testX = cx;
    let testY = cy;

    if (cx < px - halfPW) {
        testX = px - halfPW;
    }
    if (cx > px + halfPW) {
        testX = px + halfPW;
    }
    if (cy < py - halfPH) {
        testY = py - halfPH;
    }
    if (cy > py + halfPH) {
        testY = py + halfPH;
    }

    let distX = cx - testX;
    let distY = cy - testY;
    let distance = sqrt((distX * distX) + (distY * distY));

    if (distance <= circle.width / 2)
        return true;
    return false;
}