// Need to target my audio element, image element as well as my buttons
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const forwardBtn = document.getElementById('forward');


// Array of objects for music
const songs = [
	{
		name: 'yannick-1',
		displayName: 'Non Stop',
		artist: 'Unknown Instrumentalz',
	},
	{
		name: 'yannick-2',
		displayName: 'Pirate',
		artist: 'Yasuu',
	},
	{
		name: 'yannick-3',
		displayName: 'Groove Day',
		artist: 'SoulProdMusic',
	}
	];



// Check if playing

let isPlaying = false;


// Play function
function playSong() {
	isPlaying = true;
	// Replaces the play button with a pause buttton and also adds the Pause title upon hovering
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

// Pause function
function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}

// Play/Pause event listener - Ternary Operator 

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Updating the DOM (Can use textContent or innerText. innerText uses reflows. Minor change)
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

// Current Song (let, not const as value is fluid)

let songIndex = 0;

// Previous song
function prevSong() {
	songIndex--;
	// If statement, for song index
	if (songIndex < 0) {
		songIndex = songs.length -1;
	}
	console.log(songIndex);
	loadSong(songs[songIndex]);
	playSong();
}

// Next song
function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	console.log(songIndex);
	loadSong(songs[songIndex]);
	playSong();
}

// On load, select first song

loadSong(songs[songIndex]);

// Update Progress Bar and time. (e) parameter is for event
function updateProgressBar(e) {
	if (isPlaying) {
		const { duration, currentTime } = e.srcElement;
		// Update progress bar width (Most difficult part for me)
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;
		// Calculate the display for duration in minutes
		const durationMinutes = Math.floor(duration / 60);
		//console.log('minutes', durationMinutes);
		let durationSeconds = Math.floor(duration % 60);
		// If statement to change the seconds to a string, showing 05 instead of 5
		if (durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}
		console.log('seconds', durationSeconds);		
		// Delay switching songs too quickly to prevent NaN error on JS console
		if (durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		}


// Calaculate display for current time
const currentMinutes = Math.floor(currentTime / 60);
//console.log('minutes', currentMinutes);
let currentSeconds = Math.floor(currentTime % 60);
// If statement to change the seconds to a string, showing 05 instead of 5
if (currentSeconds < 10) {
	currentSeconds = `0${currentSeconds}`;
}
//console.log('seconds', currentSeconds);	
currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

// Set Progress Bar function

function setProgressBar(e) {
	const width = this.clientWidth;
	// Width 360 clickX 117
	console.log('width', width); 
	const clickX = e.offsetX;
	console.log('clickX', clickX);
	//Destructured const
	const { duration } = music;
	console.log(clickX / width);
	console.log((clickX / width) * duration);
	// Width, clickX, percentage and seconds
	// currentTime property sets or returns the current position (in seconds) of the audio/video playback.
	music.currentTime = (clickX / width) * duration;
}

// Event Listeners
previousBtn.addEventListener('click', prevSong);
forwardBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);