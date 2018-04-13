let config;
let paused = true;
let showVectorField = true;
let showParticles = true;
let showGrid = true;
let showAxes = true;
let zoom = 5;
let system;
let plane;
let viewport;
let f;

let vectorField = function(x, y) {
	let vec = {};
	vec = { 'x': y**3 - 9*y, 'y': x**3 - 9*x }
	// vec = { 'x': -y, 'y': x }
	// vec = { 'x': x, 'y': y }
	// vec = { 'x': Math.sin(y), 'y': Math.sin(x) }
	// vec = { 'x': Math.sin(x) + Math.sin(y), 'y': Math.sin(x) - Math.sin(y) }
	// vec = { 'x': 0, 'y': y*Math.sin(x) }
	// vec = { 'x': x**3, 'y': y**3 }
	// vec = { 'x': Math.cos(x + y), 'y': Math.sin(x*y) }
	return vec
}

function setup() {
	config = {
		'plane': {
			'grid': {
				'color': color(128, 128, 128, 255),
				'weight': 1,
				'axis': {
					'tickmarkSize': 10,
					'color': color(128, 128, 128, 255),
					'weight': 4,
				}
			},
			'friction': 0.5,
			'deltaFriction': 0.1
		},
		'vector': {
			'spacing': 0.5,
			'color': color(0, 255, 255, 64),
			'weight': 2,
		},
		'particle': {
			'spacing': 0.25,
			'diameter': 8,
			'color': color(220, 255, 220),
		},
	};
	viewport = {
		'x': { 'min': -zoom, 'max': zoom },
		'y': { 'min': -zoom, 'max': zoom }
	}
	// createCanvas(windowWidth, windowHeight);
	let planeContainer = document.querySelector('#planeContainer');
	let canvas = createCanvas(600, 600);
	canvas.parent(planeContainer);
	plane = new Plane();
	system = new ParticleSystem();
	f = new VectorField();
	initializeButtons();
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
	if (showVectorField) {
		plane.drawVectorField();
	}
	if (showParticles) {
		system.draw();
	}
	if (!paused) {
		system.update();
		system.applyForce(vectorField);
	}
}

function keyPressed() {
	if (key == ' ') {
		paused = !paused;
	}
	if (key == 'R') {
		system.respawn();
	}
	if (key == 'C') {
		system.empty();
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

function mouseXCoordinate() {
	return (mouseX - width / 2) / plane.unit;
}

function mouseYCoordinate() {
	return (height / 2 - mouseY) / plane.unit;
}

function mouseClicked() {
	system.addParticle(mouseXCoordinate(), mouseYCoordinate());
}

function mouseDragged() {
	system.addParticle(mouseXCoordinate(), mouseYCoordinate());
}

function mouseWheel(event) {
	const mouseDirection = event.deltaY > 0 ? -1 : 1;
	config.plane.friction += mouseDirection * config.plane.deltaFriction;
	return false; // to prevent page scrolling
}

function initializeButtons() {
	let playPauseButton = document.querySelector('#playPause');
	playPauseButton.addEventListener('click', (e) => {
		paused = !paused;
		let icon = playPauseButton.children[0];
		icon.classList.toggle('fa-pause');
		icon.classList.toggle('fa-play');
	});
	let clearButton = document.querySelector('#clearParticles');
	clearButton.addEventListener('click', () => system.empty() );
	let respawnButton = document.querySelector('#respawnParticles');
	respawnButton.addEventListener('click', () => system.respawn() );
}