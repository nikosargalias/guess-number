import { returnLatestGameState } from "./gameData";

const heading = document.querySelector("#game__heading");
const startGameBtn = document.querySelector("#start-game");
const difficulty = document.querySelector("#difficulty");
const gameState = document.querySelector("#game-state");
const makeGuess = document.querySelector("#make-guess");
const guessesRemaining = document.querySelector("#guesses-remaining");
const highScoreElem = document.querySelector("#high-score");
const hiddenNum = document.querySelector("#hidden-num");

function renderHighScore(highScoreValue) {
  highScoreElem.textContent = `High score: ${
    highScoreValue ? highScoreValue : "0"
  }`;
}

function renderGameIsLost() {
  const gameData = returnLatestGameState();
  hiddenNum.textContent = gameData.hiddenNum;
  gameState.textContent = "You Lost...";
  document.body.classList.add("game-lost");
  heading.textContent = "You Lost!";
}

function renderGameIsWon() {
  const gameData = returnLatestGameState();
  gameState.textContent = "You Win!!!";
  hiddenNum.textContent = gameData.hiddenNum;
  document.body.classList.add("game-won");
  heading.textContent = "You Won!";
}

function renderLostPoint() {
  const gameData = returnLatestGameState();
  guessesRemaining.textContent = `Guesses remaining: ${gameData.guessesRemaining}`;
  gameState.textContent =
    gameData.lastNumGuessed > gameData.hiddenNum ? "Too high" : "Too low";
}

function renderDuplicateGuess() {
  gameState.textContent = "You've already guessed this number";
}

function clearTextContentAndFocus(element) {
  element.value = "";
  element.focus();
}

function renderNewGameData(highScoreValue) {
  const gameData = returnLatestGameState();
  hiddenNum.textContent = "?";
  makeGuess.guess.value = "";
  gameState.textContent = "Game on...";
  guessesRemaining.textContent = `Guesses remaining: ${gameData.guessesRemaining}`;
  document.body.classList.remove("game-won", "game-lost");
  heading.textContent = "Game On...";
}

export {
  renderGameIsLost,
  renderGameIsWon,
  renderLostPoint,
  clearTextContentAndFocus,
  renderNewGameData,
  renderHighScore,
  renderDuplicateGuess,
};
