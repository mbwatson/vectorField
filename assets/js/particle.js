class Particle {
	constructor(x, y) {
		this.diameter = 0;
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.color = config.particle.color;
		this.new = true;
	}
	draw() {
		noStroke();
		// fill(color(255 - this.color, this.color, this.color));
		fill(this.color);
		if (this.new) {
			this.diameter += 1;
			if (this.diameter == config.particle.diameter) {
				this.new = false;
			}
		}
		ellipse(this.x * width / (viewport.x.max - viewport.x.min), -this.y * width / (viewport.x.max - viewport.x.min), this.diameter, this.diameter);
		// text(`(${this.x.toFixed(2)},${this.y.toFixed(2)})`, this.x * width / (viewport.x.max - viewport.x.min), -this.y * width / (viewport.x.max - viewport.x.min));
	}
	speed() {
		Math.sqrt(this.dx**2 + this.dy**2)
	}
	applyForce(force) {
		if (config.plane.velocity != 0) {
			this.dx = force.eval(this).x * config.plane.velocity / 500;
			this.dy = force.eval(this).y * config.plane.velocity / 500;
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

