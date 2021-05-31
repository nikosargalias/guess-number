import { returnLatestGameState } from "./gameData";

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
}

function renderGameIsWon() {
  const gameData = returnLatestGameState();
  gameState.textContent = "You Win!!!";
  hiddenNum.textContent = gameData.hiddenNum;
}

function renderLostPoint() {
  const gameData = returnLatestGameState();
  guessesRemaining.textContent = `Guesses remaining: ${gameData.guessesRemaining}`;
  gameState.textContent =
    gameData.lastNumGuessed > gameData.hiddenNum ? "Too high" : "Too low";
}

function clearTextContentAndFocus(element) {
  element.value = "";
  element.focus();
}

function renderNewGameData(gameData, highScoreValue) {
  hiddenNum.textContent = "?";
  makeGuess.guess.value = "";
  gameState.textContent = "Game on...";
  guessesRemaining.textContent = `Guesses remaining: ${gameData.guessesRemaining}`;
}

export {
  renderGameIsLost,
  renderGameIsWon,
  renderLostPoint,
  clearTextContentAndFocus,
  renderNewGameData,
  renderHighScore,
};
