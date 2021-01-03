class Ball {
    x;
    y;
    speed;

    constructor(x, y, width, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.loc = createVector(x, y);
        this.vel = createVector(random([1, -1]), random([1, -1])).normalize().mult(this.speed);
    }

    draw() {
        noStroke();
        fill(color(255, 255, 255));
        ellipse(this.loc.x, this.loc.y, this.width);
    }

    reset() {
        this.loc = createVector(this.x, this.y);
        this.vel = createVector(random([1, -1]), random([1, -1])).normalize().mult(this.speed);
    }
}