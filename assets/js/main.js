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
	playPauseButton = createButton('Play/Pause').addClass('btn btn-primary').parent(controlsDiv);
	clearButton = createButton('Clear').addClass('btn btn-primary').parent(controlsDiv);
	respawnButton = createButton('Respawn').addClass('btn btn-primary').parent(controlsDiv);
	toggleParticlesButton = createButton('Particles').addClass('btn btn-primary').parent(controlsDiv);
	toggleVectorsButton = createButton('Vectors').addClass('btn btn-primary').parent(controlsDiv);
	toggleAxesButton = createButton('Axes').addClass('btn btn-primary').parent(controlsDiv);
	toggleGridButton = createButton('Grid').addClass('btn btn-primary').parent(controlsDiv);
	vectorButton = createButton('$\\langle -y, x \\rangle$');
	vectorButton.parent(presetFunctionsDiv);
}

function initializeUI() {
	// play/pause
	playPauseButton.mouseClicked(() => {
		paused = !paused;
		// let icon = playPauseButton.children[0];
		// icon.classList.toggle('fa-pause');
		// icon.classList.toggle('fa-play');
	});
	// delete
	clearButton.mouseClicked(() => system.empty() );
	// respawn
	respawnButton.mouseClicked(() => system.respawn() );
	// // toggle particle visibility
	// toggleParticlesButton.addEventListener('click', () => {
	// 	showParticles = !showParticles;
	// 	let icon = toggleParticlesButton.children[0];
	// 	icon.toggleClasses('fa-eye', 'fa-eye-slash');
	// 	toggleParticlesButton.toggleClasses('btn-primary', 'btn-secondary');
	// });
	// // toggle vector visibility
	// toggleVectorsButton.addEventListener('click', () => {
	// 	showVectorField = !showVectorField;
	// 	toggleVectorsButton.toggleClasses('btn-primary', 'btn-secondary');
	// });
	// // toggle axis visibility
	// toggleAxesButton.addEventListener('click', () => {
	// 	showAxes = !showAxes;
	// 	toggleAxesButton.toggleClasses('btn-primary', 'btn-secondary');
	// });
	// // toggle gid visibility
	// toggleGridButton.addEventListener('click', () => {
	// 	showGrid = !showGrid;
	// 	toggleGridButton.toggleClasses('btn-primary', 'btn-secondary');
	// });
	// // hovering over plane check
	// planeCanvas.addEventListener('mouseover', () => {
	// 	hovering = true;
	// 	planeCanvas.classList.add('hovering');
	// });
	// planeCanvas.addEventListener('mouseout', () => {
	// 	planeCanvas.classList.remove('hovering');
	// 	hovering = false;
	// });
	//
	// vectorButton.addEventListener('click', () => {
	// 	console.log('asdadsasd');
	// });
}