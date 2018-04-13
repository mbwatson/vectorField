class Particle {
	constructor(x, y) {
		this.diameter = config.particle.diameter;
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.color = config.particle.color;
	}
	draw() {
		noStroke();
		// fill(color(255 - this.color, this.color, this.color));
		fill(this.color);
		ellipse(this.x * width / (viewport.x.max - viewport.x.min), -this.y * width / (viewport.x.max - viewport.x.min), this.diameter, this.diameter);
		// text(`(${this.x.toFixed(2)},${this.y.toFixed(2)})`, this.x * width / (viewport.x.max - viewport.x.min), -this.y * width / (viewport.x.max - viewport.x.min));
	}
	speed() {
		Math.sqrt(this.dx**2 + this.dy**2)
	}
	applyForce(vectorField) {
		if (config.plane.friction != 0) {
			this.dx = vectorField(this.x, this.y).x * config.plane.friction / 500;
			this.dy = vectorField(this.x, this.y).y * config.plane.friction / 500;
		} else {
			this.dx = this.dy = 0;
		}
		this.x += this.dx;
		this.y += this.dy;
	}
	update() {
		this.x += this.dx;
		this.y += this.dy;
	}
}

