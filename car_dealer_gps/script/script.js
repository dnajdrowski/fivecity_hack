const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.getElementById('hackFunction2');
const hackOptions = document.querySelector('.hackOptions');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');

var __timePlay = document.getElementById('timeChangeInput');
var __spawnPlay = document.getElementById('spawnChangeInput');

var progressBarInterval;
var squaresInterval;
var allSquares;

var defaultTime = 20;
var defaultSpawn = 350;

const start = () => {
	allSquares = 0;
	buttonStart.style.display = 'none';
	hackOptions.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	clearInterval(squaresInterval);
	progressBarStart('start', 2);
};

const gameOver = () => {
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Hack nieudany!';
	hackFunction.style.display = 'none';
	hackText.style.display = 'none';
	hackFunction2.style.display = 'none';
	clearInterval(squaresInterval);
	progressBarStart('end', 2);
};

hackFunction2.onclick = function () {
	gameOver();
};

function progressBarStart(type, time) {
	var maxwidth = 1000;
	var width = maxwidth;
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				progressBarStart('game', __timePlay.value);
				createNumbers();
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackInfo.style.display = 'block';
				textInfo.innerHTML = 'Hack Udany';
				hackText.style.display = 'none';
				hackFunction2.style.display = 'none';
				clearInterval(squaresInterval);
				progressBarStart('end', 2);
				return;
			}

			if (type == 'end') {
				hackFunction.style.display = 'none';
				hackText.style.display = 'none';
				buttonStart.style.display = '';
				hackOptions.style.display = '';
				progressBar.style.display = 'none';
				hackInfo.style.display = 'none';
			}
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

function createNumbers() {
	hackFunction.innerHTML = '';

	let currentIndex = 0;

	while (currentIndex <= 48) {
		const el = document.createElement('div');
		el.classList.add('el');
		el.setAttribute('id', currentIndex);

		hackFunction.appendChild(el);

		el.onclick /*onmousedown*/ = function () {
			if (el.classList.contains('select')) {
				el.classList.remove('select');
				allSquares--;
			} else gameOver();
		};

		currentIndex++;
	}

	var random;
	squaresInterval = setInterval(() => {
		random = Math.floor(Math.random() * 47);
		if (!document.getElementById(random).classList.contains('select')) {
			document.getElementById(random).classList.add('select');
			allSquares++;
		} else {
			random = Math.floor(Math.random() * 47);
			document.getElementById(random).classList.add('select');
			allSquares++;
		}

		if (allSquares > 10) gameOver();
	}, __spawnPlay.value);

	hackFunction2.style.display = '';
}

hackFunction.style.display = 'none';
hackText.style.display = 'none';
progressBar.style.display = 'none';
hackInfo.style.display = 'none';
hackFunction2.style.display = 'none';

document.getElementById('timeChangeId').innerHTML = String(defaultTime);
document.getElementById('spawnChangeId').innerHTML = String(defaultSpawn);

function timeChangeFunction() {
	document.getElementById('timeChangeId').innerHTML =
		document.getElementById('timeChangeInput').value;
}

function spawnChangeFunction() {
	document.getElementById('spawnChangeId').innerHTML =
		document.getElementById('spawnChangeInput').value;
}

document.addEventListener('contextmenu', event => event.preventDefault());
