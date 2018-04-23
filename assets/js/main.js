// Globals
let zoom = 5;
let hovering = false;
let canvasWidth = 600;
let canvasheight = 600;

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

// Main parts
let canvasSurface;
let canvasOverlay;

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

let config = {
	'plane': {
		'grid': {
			'color': 255, //[128, 128, 128, 255],
			'weight': 1,
			'axis': {
				'tickmarkSize': 10,
				'color': 255, //[128, 128, 128, 255],
				'weight': 4,
			}
		},
		'velocity': 0.2,
		'deltaVelocity': 0.1
	},
	'vector': {
		'spacing': 2,
		'color': 255, //[0, 255, 255, 128],
		'weight': 2,
	},
	'particle': {
		'spacing': 2,
		'diameter': 8,
		'color': 255, //[220, 255, 220],
	}
};

let viewport = {
	'x': { 'min': -zoom, 'max': zoom },
	'y': { 'min': -zoom, 'max': zoom }
};

let stage = document.getElementById('stage');

let plane = new Plane();
let f = new VectorField();
let system = new ParticleSystem();

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

canvasSurface = new p5(surface);
canvasOverlay = new p5(overlay);
