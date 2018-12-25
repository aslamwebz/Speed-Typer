window.addEventListener('load', init);

// Globals

//levels
const select = document.querySelector('#select');

let currentLevel = select.value;

//To change level]

let time = currentLevel;
let score = 0;
let isPlaying;



// Dom Elements

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');



const words = [  "Mckee",  "Eula",  "Andrews",  "Meghan",  "Knapp",  "Benita",  "Maxwell",  "Therese",
  "Norma",  "English",  "Jennine",  "Hayes",  "Pitts",  "Gaines",  "Swanson",  "Matthews",  "Lawrence",
  "Hanson",  "Nicholson",  "Autumn",  "Colleen",  "Irene",  "Curtis",  "Goff",  "Gamble",  "Richard",
  "Olive",  "Kathleen",  "Wilcox",  "Reed",  "Doris",  "Carmella",  "Harrington",  "Paula",  "Cooper",
  "Carey",  "Terrie",  "Shana",  "Mercedes",  "Louise",  "Jeanette",  "Kline",  "Kristine",  "Virgie",
  "Earnestine",  "Viola",  "Dolly",  "Antoinette",  "Belinda"
];


//Init
function init(){
	//Show number of seconds in UI
	seconds.innerHTML = currentLevel;
	//Load wird from array
	showWord(words);
	//Start maching on word input
	wordInput.addEventListener('input', startMatch);
	//Call countdown every second
	setInterval(countdown, 1000);
	//Check game status
	setInterval(checkStatus, 50);
	//Check the level
	select.addEventListener('change', changeLevel);
	//Set and get High score
	getHighScore();
}


//Level Change
function changeLevel(){
	currentLevel = select.value;
	console.log(currentLevel);
	restart();
}

//start match
function startMatch(){
	if(matchWords()){
		isPlaying = true;
		time = currentLevel ;
		showWord(words);
		wordInput.value = '';
		score++;
	} 

	//if score is -1 , display 0
	if(score === -1){
		scoreDisplay.innerHTML = 0;
	}else{
		scoreDisplay.innerHTML = score;
	}
}

//Match currentWord to wordInput
function matchWords(){
	if(wordInput.value === currentWord.innerHTML){
		message.innerHTML = 'Correct!!!';
		return true;
	} else {
		message.innerHTML = '';
		return false;
	}
}


//Word Pick and show
function showWord(words){
	//Generate random array index
	const randIndex = Math.floor(Math.random() * words.length);	
	//Output random word
	currentWord.innerHTML = words[randIndex];
}

//Countdown Timer
function countdown(){
	//check time is not running out
	if(time > 0){
		//Decrement
		time--;
	}else if(time === 0){
		//Game is over
		isPlaying = false;
		if(score > 0){
			setHighScore();
			getHighScore();
		}
	}
	//showtime
	timeDisplay.innerHTML = time;
}

//check game status
function checkStatus(){
	if(!isPlaying && time === 0){
		message.innerHTML = 'Game Over!!!';
		score = -1;
	}
}

function restart(){
	isPlaying = true;
	time = currentLevel;
	showWord(words);
	wordInput.value = '';
	score++;
}

function setHighScore(){
	let highScore = [];
	highScore = JSON.parse(localStorage.getItem("score"));
	highScore.push(score);
	highScore.sort(function(a, b){return b-a});
	localStorage.setItem("score", JSON.stringify(highScore));
}



function getHighScore(){
  let highScore = JSON.parse(localStorage.getItem("score"));
  document.getElementById("highScores").innerHTML = '';

  // highScore.forEach(function(item){
  // 		document.getElementById("highScores").innerHTML += `<li class="text-left">${item}</li>`;
  // });

  for (var i = 0; i <= 5; i++) {
  	document.getElementById("highScores").innerHTML += `<li class="text-left"><p class="lead">${highScore[i]}</p></li>`;
  };

}