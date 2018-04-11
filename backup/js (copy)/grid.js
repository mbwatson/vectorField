class Grid {
	constructor(xmin, xmax, ymin, ymax) {
		this.center = createVector(width/2, height/2);
		this.unitSize = 50;
		this.xmin = xmin;
		this.xmax = xmax;
		this.ymin = ymin;
		this.ymax = ymax;
		this.grabbed = false;
	}
	draw() {
		stroke(100);
		for (let x = this.center.x; x < this.xmax; x += 5) {
			line(x,0,x,x);
			line(x, this.ymin * this.unitSize, x, this.ymax * this.unitSize);
		}
		this.plotPoint(0,0);
	}
	plotPoint(x, y, r = 8) {
		fill(255);
		ellipse(x, -y, r, r);
	}
}
