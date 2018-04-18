const planeCanvas = document.getElementById('plane');
const playPauseButton = document.querySelector('#playPause');
const clearButton = document.querySelector('#clearParticles');
const respawnButton = document.querySelector('#respawnParticles');
const toggleParticlesButton = document.querySelector('#toggleParticles');
const toggleVectorsButton = document.querySelector('#toggleVectors');
const toggleAxesButton = document.querySelector('#toggleAxes');
const toggleGridButton = document.querySelector('#toggleGrid');

// hovering over plane check
// planeCanvas.addEventListener('mouseover', () => {
// 	hovering = true;
// 	planeCanvas.classList.add('hovering');
// });
// planeCanvas.addEventListener('mouseout', () => {
// 	planeCanvas.classList.remove('hovering');
// 	hovering = false;
// });

// play/pause
playPauseButton.addEventListener('click', (e) => {
	paused = !paused;
	let icon = playPauseButton.children[0];
	icon.classList.toggle('fa-pause');
	icon.classList.toggle('fa-play');
});

// delete
clearButton.addEventListener('click', () => system.empty() );

// respawn
respawnButton.addEventListener('click', () => system.respawn() );

// toggle particle visibility
toggleParticlesButton.addEventListener('click', () => {
	showParticles = !showParticles;
	let icon = toggleParticlesButton.children[0];
	icon.toggleClasses('fa-eye', 'fa-eye-slash');
	toggleParticlesButton.toggleClasses('btn-primary', 'btn-secondary');
});

// toggle vector visibility
toggleVectorsButton.addEventListener('click', () => {
	showVectorField = !showVectorField;
	toggleVectorsButton.toggleClasses('btn-primary', 'btn-secondary');
});

// toggle axis visibility
toggleAxesButton.addEventListener('click', () => {
	showAxes = !showAxes;
	toggleAxesButton.toggleClasses('btn-primary', 'btn-secondary');
});

// toggle grid visibility
toggleGridButton.addEventListener('click', () => {
	showGrid = !showGrid;
	toggleGridButton.toggleClasses('btn-primary', 'btn-secondary');
});

//
const presetFunctionsDiv = document.getElementById('presets');
// shortcuts as buttons to change the vector field to some preset vector funcitons
