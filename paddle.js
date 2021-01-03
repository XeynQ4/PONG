class Paddle {
    x;
    y;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loc = createVector(this.x, this.y);
    }

    draw() {
        rectMode(CENTER);
        noStroke();
        fill(color(0, 0, 0));
        rect(this.loc.x, this.loc.y, this.width, this.height);
        rectMode(CORNER);
    }

    reset() {
        this.loc = createVector(this.x, this.y);
    }
}