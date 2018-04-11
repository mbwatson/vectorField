class Plane {
	constructor() {
		this.minx = -3;
		this.maxx = 3;
		this.miny = -3;
		this.maxy = 3;
		this.axisColor = 200;
		this.gridColor = 64;
		this.tickSize = 5;
		// this.size = max(height, width) / 1;
		this.unit = width / (viewport.x.max - viewport.x.min);
	}
	drawAxes() {
		stroke(this.axisColor);
		strokeWeight(1);
		line(0, -width / 2, 0, width / 2);
		line(-width / 2, 0, width / 2, 0);
	}
	drawGrid() {
		stroke(this.gridColor);
		strokeWeight(1);
		for (let x = 0; x < width / 2; x += this.unit) {
			line(x, -height / 2, x, height / 2);
			line(-x, -height / 2, -x, height / 2);
		}
		for (let y = 0; y < height / 2; y += this.unit) {
			line(-width / 2, y, width / 2, y);
			line(-width / 2, -y, width / 2, -y);
		}
	}
	xTick(value, label) {
		noFill();
		stroke(this.axisColor);
		strokeWeight(1);
		line(value * this.unit, -this.tickSize, value * this.unit, this.tickSize);
		// text(label, value * this.unit + this.tickSize, -2 * this.tickSize);
	}
	yTick(value) {
		strokeWeight(1);
		stroke(this.axisColor);
		line(-this.tickSize, value * this.unit , this.tickSize, value * this.unit);
	}
	drawLabels() {
		noStroke();
		for (let i = 1; i <= viewport.x.max; i += 1) {
			this.xTick(i, i);
			this.xTick(-i, -i);
		}
		for (let j = 1; j <= viewport.y.max; j += 1) {
			this.yTick(j);
			this.yTick(-j);
		}
	}
	drawVectorField() {
		strokeWeight(1);
		for (let vector of f.vectors) {
			line(this.unit*vector.x, this.unit*vector.y, this.unit*vector.x + f.eval(vector).x, this.unit*vector.y + f.eval(vector).y);
		}
	}
}