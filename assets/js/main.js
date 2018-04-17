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
let hovering = false;

let vectorField = function(x, y) {
	let func;
	func = {'x': y**3 - 9*y, 'y': x**3 - 9*x };
	// func = {'x': -y, 'y': x };
	// func = { 'x': x, 'y': y };
	// func = { 'x': Math.sin(y), 'y': Math.sin(x) };
	// func = { 'x': Math.sin(x) + Math.sin(y), 'y': Math.sin(x) - Math.sin(y) };
	// func = { 'x': 0, 'y': y*Math.sin(x) };
	// func = { 'x': x**3, 'y': y**3 };
	// func = { 'x': Math.cos(x + y), 'y': Math.sin(x*y) };
	return func;
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
			'velocity': 0.2,
			'deltaVelocity': 0.1
		},
		'vector': {
			'spacing': 0.5,
			'color': color(0, 255, 255, 128),
			'weight': 2,
		},
		'particle': {
			'spacing': 0.5,
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
	canvas.id('plane');
	plane = new Plane();
	system = new ParticleSystem();
	f = new VectorField();
	initializeUI();
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
	if (hovering) {
		const mouseDirection = event.deltaY > 0 ? -1 : 1;
		config.plane.velocity += mouseDirection * config.plane.deltaVelocity;
	}
	return false; // to prevent page scrolling
}

Element.prototype.toggleClasses = function(className1, className2) {
	this.classList.toggle(className1);
	this.classList.toggle(className2);
}

function initializeUI() {
	// play/pause
	const playPauseButton = document.querySelector('#playPause');
	playPauseButton.addEventListener('click', (e) => {
		paused = !paused;
		let icon = playPauseButton.children[0];
		icon.classList.toggle('fa-pause');
		icon.classList.toggle('fa-play');
	});
	// delete
	const clearButton = document.querySelector('#clearParticles');
	clearButton.addEventListener('click', () => system.empty() );
	// respawn
	const respawnButton = document.querySelector('#respawnParticles');
	respawnButton.addEventListener('click', () => system.respawn() );
	// toggle particle visibility
	const toggleParticlesButton = document.querySelector('#toggleParticles');
	toggleParticlesButton.addEventListener('click', () => {
		showParticles = !showParticles;
		let icon = toggleParticlesButton.children[0];
		icon.toggleClasses('fa-eye', 'fa-eye-slash');
		toggleParticlesButton.toggleClasses('btn-primary', 'btn-secondary');
	});
	// toggle vector visibility
	const toggleVectorsButton = document.querySelector('#toggleVectors');
	toggleVectorsButton.addEventListener('click', () => {
		showVectorField = !showVectorField;
		toggleVectorsButton.toggleClasses('btn-primary', 'btn-secondary');
	});
	// toggle axis visibility
	const toggleAxesButton = document.querySelector('#toggleAxes');
	toggleAxesButton.addEventListener('click', () => {
		showAxes = !showAxes;
		toggleAxesButton.toggleClasses('btn-primary', 'btn-secondary');
	});
	// toggle gid visibility
	const toggleGridButton = document.querySelector('#toggleGrid');
	toggleGridButton.addEventListener('click', () => {
		showGrid = !showGrid;
		toggleGridButton.toggleClasses('btn-primary', 'btn-secondary');
	});
	// hovering over plane check
	const planeCanvas = document.getElementById('plane');
	planeCanvas.addEventListener('mouseover', () => {
		hovering = true;
		planeCanvas.classList.add('hovering');
	});
	planeCanvas.addEventListener('mouseout', () => {
		planeCanvas.classList.remove('hovering');
		hovering = false;
	});
	//
	const presetFunctionsDiv = document.getElementById('presets');
	// shortcuts as buttons to change the vector field to some preset vector funcitons
}