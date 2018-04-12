let paused = true;
let showVectorField = true;
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

