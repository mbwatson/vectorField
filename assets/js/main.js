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

// Controls
let playPauseButton;
let clearButton;
let respawnButton;
let toggleParticlesButton;
let toggleVectorsButton;
let toggleAxesButton;
let toggleGridButton;
let planeCanvas;
let presetFunctionsDiv;

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
	setupUI();
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
		// console.log(f);
		system.applyForce(f);
	}
}

const vectorFunctions = [
	({x, y}) => { return {'x': y**3 - 9*y, 'y': x**3 - 9*x } },
	({x, y}) => { return { 'x': -y, 'y': x } },
	({x, y}) => { return { 'x': x, 'y': y } },
	({x, y}) => { return { 'x': Math.sin(y), 'y': Math.sin(x) } },
	({x, y}) => { return { 'x': Math.sin(x) + Math.sin(y), 'y': Math.sin(x) - Math.sin(y) } },
	({x, y}) => { return { 'x': 0, 'y': y*Math.sin(x) } },
	({x, y}) => { return { 'x': x**3, 'y': y**3 } },
	({x, y}) => { return { 'x': Math.cos(x + y), 'y': Math.sin(x*y) } },
]

function setVectorField(v) {
	f.func = v;
	f.vectors = f.newVectors();
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

function setupUI() {
	controlsDiv = document.getElementById('controls');
	planeCanvas = document.getElementById('plane');
	playPauseButton = createButton('Play/Pause').addClass('btn btn-primary').parent(controlsDiv);
	clearButton = createButton('Clear').addClass('btn btn-primary').parent(controlsDiv);
	respawnButton = createButton('Respawn').addClass('btn btn-primary').parent(controlsDiv);
	toggleParticlesButton = createButton('Particles').addClass('btn btn-primary').parent(controlsDiv);
	toggleVectorsButton = createButton('Vectors').addClass('btn btn-primary').parent(controlsDiv);
	toggleAxesButton = createButton('Axes').addClass('btn btn-primary').parent(controlsDiv);
	toggleGridButton = createButton('Grid').addClass('btn btn-primary').parent(controlsDiv);
	vectorButton = createButton('$\\langle -y, x \\rangle$');
}

function initializeUI() {
	// play/pause
	playPauseButton.mouseClicked(() => {
		paused = !paused;
	});
	clearButton.mouseClicked(() => system.empty() );
	respawnButton.mouseClicked(() => system.respawn() );
	toggleParticlesButton.mouseClicked(() => {
		showParticles = !showParticles;
	});
	toggleVectorsButton.mouseClicked(() => {
		showVectorField = !showVectorField;
	});
	toggleAxesButton.mouseClicked(() => {
		showAxes = !showAxes;
	});
	toggleGridButton.mouseClicked(() => {
		showGrid = !showGrid;
	});
	planeCanvas.addEventListener('mouseover', () => {
		hovering = true;
		// planeCanvas.classList.add('hovering');
	});
	planeCanvas.addEventListener('mouseout', () => {
		hovering = false;
		// planeCanvas.classList.remove('hovering');
	});
	vectorButton.mouseClicked(() => {
		setVectorField(vectorFunctions[1]);
	});
}
