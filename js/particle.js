class Particle {
	constructor(x, y) {
		this.r = 5;
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.color = 255;
	}
	draw() {
		noStroke();
		// fill(color(255 - this.color, this.color, this.color));
		fill(255);
		ellipse(this.x * width / (viewport.x.max - viewport.x.min), -this.y * width / (viewport.x.max - viewport.x.min), this.r, this.r);
		// text(`(${this.x.toFixed(2)},${this.y.toFixed(2)})`, this.x * width / (viewport.x.max - viewport.x.min), -this.y * width / (viewport.x.max - viewport.x.min));
	}
	applyForce(vectorField) {
		this.dx = vectorField(this.x, this.y).x/1000;
		this.dy = vectorField(this.x, this.y).y/1000;
		this.x += this.dx;
		this.y += this.dy;
		// this.color = floor(255*Math.sqrt(this.dx**2 + this.dy**2));
	}
	update() {
		this.x += this.dx;
		this.y += this.dy;
	}
}

