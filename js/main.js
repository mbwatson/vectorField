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
	// scale(1, -1);
	plane.drawGrid(10);
	plane.drawAxes();
	plane.drawLabels();
	if (showVectorField) {
		plane.drawVectorField();
	}
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
	if (key == 'V') {
		showVectorField = !showVectorField;
	}
}
