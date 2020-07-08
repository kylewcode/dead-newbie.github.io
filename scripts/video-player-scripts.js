// Get our elements.
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build functions.
function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateVideo(element) {
    video[element.name] = element.value
}

function onKeyUp(e) {
    if(e.key.includes('Arrow')) updateVideo(this);
}

function onMouseMove(e) {
    if(e.buttons === 1) updateVideo(this);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// Hook up event listeners.
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(element => {
    element.addEventListener('click', skip);
});
ranges.forEach(element => {
    element.addEventListener('mousemove', onMouseMove);
});
ranges.forEach(element => {
    element.addEventListener('keyup', onKeyUp);
});