const unit = 100;
let points = [];

class Plane {
	constructor() {
		this.xmin = - width / 2;
		this.xmax = width / 2;
		this.ymin = - height / 2;
		this.ymax = height / 2;
	}
	background(options) {
		if (options === undefined) {
			options = {};
		} else {
			if (options.axes === undefined) {
				options.axes = true;
			}
			if (options.grid === undefined) {
				options.axes = true;
			}
		}
		if (options.axes === true) {
			strokeWeight(3);
			stroke(200);
			line(-width / 2, height / 2, width, height / 2); // x-axis
			line(width / 2, 0, width / 2, height); // y-axis
		}
		if (options.grid === true) {
			strokeWeight(1);
			stroke(100);
			fill(120);
			for (var x = 0; x < width; x += unit) {
				line(x, 0, x, height);
				// text(x, x + 1, unit);
			}
			for (var y = 0; y < height; y += unit) {
				line(0, y, width, y);
				// text(y, 1, y);
			}
			
		}
	}
	drawPoint(p) {
		strokeWeight(3);
		stroke(255);
		point(p.x, p.y);
	}
	drawLocatedVector(x, y, v) {
		strokeWeight(1);
		stroke(color(0, 255, 255));
		translate(x, y);
		line(0, 0, 25*v.normalize().x, 25*v.normalize().y)
		translate(-x, -y);
	}
}

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(600, 600);
	for (let i = -width / 2; i <= width / 2; i += 50) {
		for (let j = -height / 2; j <= height / 2; j += 50) {
			points.push(createVector(i, j));
		}
	}
	console.table(points);
	// scale(1, -1);
	plane = new Plane();
}

function draw() {
	background(50);
	plane.background({ axes: true, grid: true });
	scale(1, -1);
	translate(width / 2, -height / 2);
	// drawGrid();
	for (let p of points) {
		plane.drawPoint(p, 5);
	}
	plane.drawPoint({x:0,y:0});
	for (let i = -400; i < 400; i += 50) {
		for (let j = -400; j < 400; j += 50) {
			let v = createVector(cos(j),Math.sin(i));
			plane.drawLocatedVector(i, j, v);
		}
	}
}

var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255.0;
};


