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

// toggle grid visibility
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
