// setting up the variables

const openingWindow = document.querySelector(".openingWindow");
const form = document.querySelector(".targetScoreForm");
const submitButton = document.querySelector(".submitButton");
let targetScore = document.getElementById("targetScoreDisplay");
const inputElement = document.getElementById("targetscoreId");
const diceOne = document.getElementById("diceOne");
const diceTwo = document.getElementById("diceTwo");
let p1CurrentScore = document.getElementById("current-score-player-one");
let p2CurrentScore = document.getElementById("current-score-player-two");
let p1TotalScore = document.getElementById("totalScore-player-one");
let p2TotalScore = document.getElementById("totalScore-player-two");
let totalP1Accu = 0;
let totalP2Accu = 0;
let rand1;
let rand2;
let rollDiceButton = document.querySelector(".rollDiceButton");
let playerOneIsActive = true;
let currentAccum = 0;
let playerOneDashBoard = document.getElementById("playerOneContainer");
let playerTwoDashBoard = document.getElementById("playerTwoContainer");
let inputValue;
const holdButton = document.querySelector(".hold");
const newGameButton = document.querySelector(".newGame");
const audio = document.querySelector("#audio");
let gameOver = false;

//setting up an event listenr to process the input above the submit button

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputElement.value >= 12 && inputElement.value <= 500) {
    inputValue = inputElement.value;
    targetScore.textContent = inputValue;

    openingWindow.style.display = "none";
  } else {
  }
});

// this function generates two random ints between 1-6
// assigns these numbers to variables rand1 and rand 2
// and switches the styling of the elements diceOne & DiceTwo
//to to display the corresponding dice images

const rollDice = () => {
  rand1 = Math.ceil(Math.random() * 6);
  rand2 = Math.ceil(Math.random() * 6);
  console.log(rand1);
  console.log(rand2);
  diceOne.style.backgroundImage = `url('/Dice_Game_Starter-main/dice-${rand1}.png')`;
  diceTwo.style.backgroundImage = `url('/Dice_Game_Starter-main/dice-${rand2}.png')`;
};

//Setting up an event listener function for the roll dice button
//in order to generate new random dice by clicking the button

rollDiceButton.addEventListener("click", function (e) {
  e.preventDefault();
  audio.play();
  rollDice();
  game();
});

newGameButton.addEventListener("click", function (e) {
  e.preventDefault();
  p1CurrentScore.textContent = 0;
  p2CurrentScore.textContent = 0;
  p1TotalScore.textContent = 0;
  p2TotalScore.textContent = 0;
  totalP1Accu = 0;
  totalP2Accu = 0;
  currentAccum = 0;
  gameOver = false;
  playerOneIsActive = true;
  diceOne.style.backgroundImage = `url('Dice_Game_Starter-main/question.png')`;
  diceTwo.style.backgroundImage = `url('Dice_Game_Starter-main/question.png')`;
  openingWindow.style.display = "flex";
  switchActiveTwotoOne();
});

holdButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (gameOver === false) {
    if (playerOneIsActive === true) {
      totalP1Accu += currentAccum;
      p1TotalScore.textContent = totalP1Accu;
      p1CurrentScore.textContent = 0;
      currentAccum = 0;
      playerOneIsActive = false;
      switchActiveOnetoTwo();
    } else {
      switchActiveTwotoOne();
      totalP2Accu += currentAccum;
      p2TotalScore.textContent = totalP2Accu;

      currentAccum = 0;
      playerOneIsActive = true;
    }
  }
});
//function to change the the design of active player vs not active player
function switchActiveOnetoTwo() {
  playerOneDashBoard.classList.remove("playerOne-container-active");
  playerOneDashBoard.classList.add("playerOne-container");
  playerTwoDashBoard.classList.remove("playerTwo-container");
  playerTwoDashBoard.classList.add("playerTwo-container-active");
}
//function to change the the design of active player vs not active player
function switchActiveTwotoOne() {
  playerTwoDashBoard.classList.remove("playerTwo-container-active");
  playerTwoDashBoard.classList.add("playerTwo-container");
  playerOneDashBoard.classList.remove("playerOne-container");
  playerOneDashBoard.classList.add("playerOne-container-active");
}

function isGameWon() {
  if (playerOneIsActive === true && currentAccum >= inputValue) {
    p1CurrentScore.textContent = `YOU WIN!`;
  }
  if (playerOneIsActive !== true && currentAccum >= inputValue) {
    p2CurrentScore.textContent = `YOU WIN!`;
  }
}

let currentPlayerCurrentScore;
let currentPlayerTotalScore;

function game() {
  if (playerOneIsActive === true) {
    if (rand1 === 6 && rand2 === 6) {
      currentAccum = 0;
      p1CurrentScore.textContent = 0;
      playerOneIsActive = false;
      switchActiveOnetoTwo();
    } else {
      currentAccum += rand1 + rand2;
      p1CurrentScore.textContent = currentAccum;
      if (currentAccum + totalP1Accu >= inputValue) {
        totalP1Accu = currentAccum;
        p1CurrentScore.textContent = `YOU WIN!`;
        gameOver = true;
        return;
      }
    }
  } else {
    if (rand1 === 6 && rand2 === 6) {
      currentAccum = 0;
      p2CurrentScore.textContent = 0;
      playerOneIsActive = true;
      switchActiveTwotoOne();
    } else {
      currentAccum += rand1 + rand2;
      p2CurrentScore.textContent = currentAccum;
      if (currentAccum + totalP2Accu >= inputValue) {
        totalP2Accu = currentAccum;
        p2CurrentScore.textContent = "YOU WIN!";
        gameOver = true;
        return;
      }
    }
  }
}
