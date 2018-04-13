class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = 6;
	}
	draw() {
		fill(255);
		noStroke();
		ellipse(this.x, this.y, this.r, this.r);
	}
}