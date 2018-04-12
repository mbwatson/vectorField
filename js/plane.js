class Plane {
	constructor() {
		this.minx = -3;
		this.maxx = 3;
		this.miny = -3;
		this.maxy = 3;
		this.unit = width / (viewport.x.max - viewport.x.min);
		this.tickSize = 5;
		this.axisColor = color(128, 128, 128, 128);
		this.axisWeight = 4;
		this.gridColor = color(128, 128, 128, 128);
		this.gridWeight = 1;
		this.vectorColor = color(0, 255, 255, 100);
		this.vectorLength = this.unit / 3;
		this.vectorWeight = 3;
		this.vectorArrowheadSize = this.vectorLength / 4;
	}
	drawAxes() {
		stroke(this.axisColor);
		strokeWeight(this.axisWeight);
		line(0, -height / 2, 0, height / 2);
		line(-width / 2, 0, width / 2, 0);
		for (let i = 1; i <= viewport.x.max; i += 1) {
			this.xTick(i, i);
			this.xTick(-i, -i);
		}
		for (let j = 1; j <= viewport.y.max; j += 1) {
			this.yTick(j);
			this.yTick(-j);
		}
	}
	drawGrid() {
		stroke(this.gridColor);
		strokeWeight(this.gridWeight);
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
		for (let v of f.vectors) {
			this.drawLocatedVector(v, v.tip);
		}
	}
	drawLocatedVector(location, v) {
		strokeWeight(this.vectorWeight);
		stroke(this.vectorColor);
		// easier to draw arrowhead
		translate(this.unit * location.x, -this.unit * location.y);
		rotate(PI - v.heading());
		line(0, 0, -this.vectorLength, 0);
		translate(-this.vectorLength, 0);
		fill(this.vectorColor);
		triangle(0, 0, this.vectorArrowheadSize, this.vectorArrowheadSize / 2, this.vectorArrowheadSize, -this.vectorArrowheadSize / 2);
		translate(this.vectorLength, 0);
		rotate(v.heading() - PI);
		translate(-this.unit * location.x, this.unit * location.y);

		// simpler, harder to draw arrowhead
		// strokeWeight(1);
		// stroke(this.vectorColor);
		// line(this.unit * location.x, this.unit * location.y, this.unit * location.x + 25*v.x/v.mag(), this.unit * location.y + -25*v.y/v.mag());
	}
}