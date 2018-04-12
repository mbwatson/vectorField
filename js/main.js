let paused = true;
let showVectorField = true;
let showParticles = true;
let showGrid = true;
let showAxes = true;
let zoom = 5;
let system;
let plane;
let f;

let vectorField = function(x, y) {
	let vec;
	vec = {
		'x': y**3 - 9*y,
		'y': x**3 - 9*x
	}
	// vec = {
	// 	'x': 5,
	// 	'y': 10
	// }
	return vec
}

let viewport = {
	'x': { 'min': -zoom, 'max': zoom },
	'y': { 'min': -zoom, 'max': zoom }
}


function setup() {
	// createCanvas(600, 600);
	createCanvas(windowWidth, windowHeight);
	plane = new Plane();
	system = new ParticleSystem();
	f = new VectorField();
}

function draw() {
	background(50);
	translate(width / 2, height / 2)
	if (showGrid) {
		plane.drawGrid(10);
	}
	if (showAxes) {
		plane.drawAxes();
	}
	plane.drawLabels();
	if (showVectorField) {
		plane.drawVectorField();
	}
	if (showParticles) {
		system.draw();
	}
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
	if (key == 'V') {
		showVectorField = !showVectorField;
	}
	if (key == 'S') {
		showParticles = !showParticles;
	}
	if (key == 'G') {
		showGrid = !showGrid;
	}
	if (key == 'A') {
		showAxes = !showAxes;
	}
}
