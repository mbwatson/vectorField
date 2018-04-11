let paused = true;
let system;
let plane;
let zoom = 4;
let f;

const vectorField = function(x, y) {
	// x /= (width / 10) * zoom;
	// y /= (width / 10) * zoom;
	return {
		'x': y**3 - 9*y,
		'y': x**3 - 9*x
	}
}

let viewport = {
	'x': { 'min': -zoom, 'max': zoom },
	'y': { 'min': -zoom, 'max': zoom }
}

function setup() {
	createCanvas(600, 600);
	// createCanvas(windowWidth, windowHeight);
	plane = new Plane();
	system = new ParticleSystem();
	f = new VectorField();
	console.log(f.eval(2,3));
}

function draw() {
	background(50);
	translate(width / 2, height / 2)
	// scale(1, -1);
	plane.drawGrid(10);
	plane.drawAxes();
	plane.drawLabels();
	plane.drawVectorField();
	system.draw();
	if (!paused) {
		system.applyForce(vectorField);
	}
}

function keyPressed() {
	if (key == ' ') {
		paused = !paused;
	}
	if (key == 'R') {
		system.reset();
	}
}
