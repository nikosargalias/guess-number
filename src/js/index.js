"use strict";
import "../scss/main.scss";

const startGameBtn = document.querySelector("#start-game");
const difficulty = document.querySelector("#difficulty");
const gameState = document.querySelector("#game-state");
const makeGuess = document.querySelector("#make-guess");
const guessesRemaining = document.querySelector("#guesses-remaining");
const highScore = document.querySelector("#high-score");
const hiddenNum = document.querySelector("#hidden-num");

let guessed = [];

startGameBtn.onclick = beginGame;

class GameState {
  constructor(difficulty) {
    this.numberRange = returnRangeBasedOnDifficulty(difficulty);
    this.hiddenNum = generateRandomNum(this.numberRange);
    this.guessesRemaining = this.numberRange != 5 ? 10 : 5;
    this.won = false;
  }
}

let game;

function beginGame() {
  game = new GameState(difficulty.value);
  renderGameData(game);
  console.log(game.hiddenNum);
}

function renderGameData(game) {
  hiddenNum.textContent = "?";
  makeGuess.guess.value = "";
  gameState.textContent = "Game on...";
  guessesRemaining.textContent = `Guesses remaining: ${game.guessesRemaining}`;
}

function returnRangeBasedOnDifficulty(difficulty) {
  switch (difficulty) {
    case "easy":
      return 5;
    case "challenging":
      return 20;
    case "difficult":
      return 50;
  }
}

function generateRandomNum(range) {
  return Math.ceil(Math.random() * range);
}

function isGuessValid(guess) {
  if (typeof guess != "number") {
    return false;
  } else if (guess > game.numberRange || guess <= 0) {
    return false;
  } else {
    return true;
  }
}

function clearTextContentAndFocus(element) {
  element.value = "";
  element.focus();
}

makeGuess.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputElem = e.target.elements.guess;
  const guess = Number(inputElem.value);

  if (!game) {
    alert("You need to click Start Game");
    clearTextContentAndFocus(inputElem);
    return;
  }

  if (!isGuessValid(guess)) {
    alert(
      "Guess must be a number between the range specified by the difficulty"
    );
    clearTextContentAndFocus(inputElem);
    return;
  }

  if (guessed.includes(guess)) {
    alert("You've already guessed this number");
    clearTextContentAndFocus(inputElem);
    return;
  }

  if (game.guessesRemaining <= 0) {
    return;
  }

  processGuess(guess);

  clearTextContentAndFocus(inputElem);
});

function processGuess(guess) {
  guessed.push(guess);
  if (guess > game.hiddenNum || guess < game.hiddenNum) {
    gameState.textContent = guess > game.hiddenNum ? "Too high" : "Too low";
    game.guessesRemaining--;
    guessesRemaining.textContent = `Guesses remaining: ${game.guessesRemaining}`;
  } else {
    game.won = true;
    gameState.textContent = "You Win!!!";
    guessed = [];
    hiddenNum.textContent = game.hiddenNum;
    updateHighScore();
  }

  if (game.guessesRemaining <= 0 && !game.won) {
    hiddenNum.textContent = game.hiddenNum;
    gameState.textContent = "You Lost...";
  }
}

function updateHighScore() {
  const highScoreCur = highScore.textContent.match(/[0-9]*/)[0];
  if (game.guessesRemaining > highScoreCur) {
    highScore.textContent = `High score: ${game.guessesRemaining}`;
  }
}
