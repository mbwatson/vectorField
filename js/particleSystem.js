class ParticleSystem {
	constructor() {
		this.spacing = 0.5;
		this.particles = this.newParticles();
	}
	newParticles() {
		let particles = [];
		particles.push(new Particle(0, 0));
		for (let i = this.spacing; i <= viewport.x.max; i += this.spacing) {
			particles.push(new Particle(i, 0));
			particles.push(new Particle(-i, 0));
			particles.push(new Particle(0, i));
			particles.push(new Particle(0, -i));
		}
		for (let i = this.spacing; i <= viewport.x.max; i += this.spacing) {
			for (let j = this.spacing; j <= viewport.y.max; j += this.spacing) {
				particles.push(new Particle(i, j));
				particles.push(new Particle(i, -j));
				particles.push(new Particle(-i, j));
				particles.push(new Particle(-i, -j));
			}
		}
		return particles;
	}
	reset() {
		this.particles = this.newParticles();
	}
	draw() {
		for (let particle of this.particles) {
			particle.draw();
		}
	}
	applyForce(force) {
		for (let particle of this.particles) {
			particle.applyForce(force);
		}
	}
	update() {
		for (let i = this.particles.length - 1; i >= 0; i--) {
			if (abs(this.particles[i].x) < width / 2 && abs(this.particles[i].y) < height / 2) {
				// this.particles[i].update();
			} else {
				// this.particles.splice(i, 1);
			}
		}
	}
}