// Globals
let config;
let plane, system, viewport, f; // vector field
let zoom = 5;
let hovering = false;

// Toggles
let paused = true;
let showVectorField = true;
let showParticles = true;
let showGrid = true;
let showAxes = true;

// Page Elements
let functionHeading;

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

const vectorFunctions = [
	new VectorFunction(
		(x,y) => y**3 - 9*y,
		(x,y) => x**3 - 9*x,
		'$\\langle y^3 - 9y, x^3 - 9x \\rangle$'),
	new VectorFunction(
		(x,y) => -y,
		(x,y) => x,
		'$\\langle -y, x \\rangle$'),
	new VectorFunction(
		(x,y) => x,
		(x,y) => y,
		'$\\langle x, y \\rangle$'),
	new VectorFunction(
		(x,y) => Math.sin(y),
		(x,y) => Math.sin(x),
		'$\\langle \\sin(y), \\sin(x) \\rangle$'),
	new VectorFunction(
		(x,y) => Math.sin(x) + Math.sin(y),
		(x,y) => Math.sin(x) - Math.sin(y),
		'$\\langle \\sin(x) + \\sin(y), \\sin(x) - \\sin(y) \\rangle$'),
	new VectorFunction(
		(x,y) => 0,
		(x,y) => y*Math.sin(x),
		'$\\langle y, y\\sin(x) \\rangle$'),
	new VectorFunction(
		(x,y) => Math.cos(x + y),
		(x,y) => Math.sin(x*y),
		'$\\langle \\cos(x + y), \\sin(xy) \\rangle$'),
	new VectorFunction(
		(x,y) => y,
		(x,y) => x**2,
		'$\\langle y, x^2 \\rangle$'),
	new VectorFunction(
		(x,y) => y**3,
		(x,y) => x**2 + 3*x*y**2,
		'$\\langle y^3, x^2 + 3xy^2 \\rangle$'),
	new VectorFunction(
		(x,y) => Math.atan(x) + y**2,
		(x,y) => Math.E**y - x**2,
		'$\\langle \\arctan(x) + y^2, e^y - x^2 \\rangle$'),
]

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
			'spacing': 2,
			'color': color(0, 255, 255, 128),
			'weight': 2,
		},
		'particle': {
			'spacing': 2,
			'diameter': 8,
			'color': color(220, 255, 220),
		}
	};
	viewport = {
		'x': { 'min': -zoom, 'max': zoom },
		'y': { 'min': -zoom, 'max': zoom }
	};
	stage = document.getElementById('stage');
	plane = new Plane();
	f = new VectorField();
	system = new ParticleSystem();
}


var surface = function( p ) {
  p.setup = function() {
		p.createCanvas(600, 600).id('surface');
		p.noLoop();
  };
  p.draw = function() {
		p.background(0);
		p.translate(width / 2, height / 2)
		if (showGrid) { plane.drawGrid(); }
		if (showAxes) { plane.drawAxes(); }
		if (showVectorField) { plane.drawVectorField(); }
  };
};

var overlay = function( p ) {
	p.setup = function() {
		p.createCanvas(600, 600).id('overlay');
	}
	p.draw = function() {
		p.translate(width / 2, height / 2)
		if (showParticles) {
			system.draw();
		}
		if (!paused) {
			system.update();
			system.applyForce(f);
		}
	}
}

const canvasSurface = new p5(surface);
const canvasOverlay = new p5(overlay);

// function mouseXCoordinate() {
// 	return (mouseX - width / 2) / plane.unit;
// }
//
// function mouseYCoordinate() {
// 	return (height / 2 - mouseY) / plane.unit;
// }
//
// function mouseClicked() {
// 	system.addParticle(mouseXCoordinate(), mouseYCoordinate());
// }
//
// function mouseDragged() {
// 	system.addParticle(mouseXCoordinate(), mouseYCoordinate());
// }
//
// function mouseWheel(event) {
// 	if (hovering) {
// 		const mouseDirection = event.deltaY > 0 ? -1 : 1;
// 		config.plane.velocity += mouseDirection * config.plane.deltaVelocity;
// 	}
// 	return false; // to prevent page scrolling
// }
//
// Element.prototype.toggleClasses = function(className1, className2) {
// 	this.classList.toggle(className1);
// 	this.classList.toggle(className2);
// }
//
// function setVectorField(index) {
// 	f.func = vectorFunctions[index].eval;
// 	f.vectors = f.newVectors();
// 	functionHeading.innerHTML = vectorFunctions[index].latex;
// 	MathJax.Hub.Typeset();
// }
//
// function setupUI() {
// 	controlsDiv = document.getElementById('controls');
// 	presetsDiv = document.getElementById('presets');
// 	functionHeading = document.getElementsByClassName('function')[0];
// 	functionHeading.innerHTML = vectorFunctions[0].latex;
// 	planeCanvas = document.getElementById('plane');
// 	playPauseButton = document.getElementById('playPause');
// 	clearButton = document.getElementById('clearParticles');
// 	respawnButton = document.getElementById('respawnParticles');
// 	toggleParticlesButton = document.getElementById('toggleParticles');
// 	toggleVectorsButton = document.getElementById('toggleVectors');
// 	toggleAxesButton = document.getElementById('toggleAxes');
// 	toggleGridButton = document.getElementById('toggleGrid');
// 	playPauseButton.addEventListener('click', () => {
// 		paused = !paused;
// 		let icon = playPauseButton.children[0];
// 		icon.toggleClasses('fa-pause', 'fa-play');
// 	});
// 	clearButton.addEventListener('click', () => system.empty() );
// 	respawnButton.addEventListener('click', () => system.respawn() );
// 	toggleParticlesButton.addEventListener('click', () => {
// 		showParticles = !showParticles;
// 		let icon = toggleParticlesButton.children[0];
// 		icon.toggleClasses('fa-eye', 'fa-eye-slash');
// 		toggleParticlesButton.toggleClasses('btn-primary', 'btn-secondary');
// 	});
// 	toggleVectorsButton.addEventListener('click', () => {
// 		showVectorField = !showVectorField;
// 		toggleVectorsButton.toggleClasses('btn-primary', 'btn-secondary');
// 	});
// 	toggleAxesButton.addEventListener('click', () => {
// 		showAxes = !showAxes;
// 		toggleAxesButton.toggleClasses('btn-primary', 'btn-secondary');
// 	});
// 	toggleGridButton.addEventListener('click', () => {
// 		showGrid = !showGrid;
// 		toggleGridButton.toggleClasses('btn-primary', 'btn-secondary');
// 	});
// 	planeCanvas.addEventListener('mouseover', () => {
// 		hovering = true;
// 		planeCanvas.classList.add('hovering');
// 	});
// 	planeCanvas.addEventListener('mouseout', () => {
// 		hovering = false;
// 		planeCanvas.classList.remove('hovering');
// 	});
// 	// Traverse preset vector functions and create a button for each.
// 	for (let i = 0; i < vectorFunctions.length; i++) {
// 		createButton(vectorFunctions[i].latex)
// 			.addClass('btn btn-primary')
// 			.mouseClicked(() => {setVectorField(i);})
// 			.parent(presetsDiv);
// 	}
// }
