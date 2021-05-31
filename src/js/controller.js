import {
  beginGame,
  //   clearGame,
  updateHighScore,
  updateGuessedHistory,
  removePoint,
  gameIsWon,
  returnLatestGameState,
  resetGameData,
  clearhighScoreStorage,
  //   isNewHighScore,
} from "./gameData";
import { isGuessValid } from "./validation";
import {
  renderHighScore,
  renderGameIsLost,
  renderGameIsWon,
  renderLostPoint,
  clearTextContentAndFocus,
  renderNewGameData,
} from "./view";
import {
  saveGameToLocalStorage,
  loadGameLocalStorage,
  loadHighScoreLocalStorage,
} from "./local-storage";

// Get game object
let gameData;

const startGameBtn = document.querySelector("#start-game");
const difficulty = document.querySelector("#difficulty");
const gameState = document.querySelector("#game-state");
const makeGuess = document.querySelector("#make-guess");
const guessesRemaining = document.querySelector("#guesses-remaining");
const highScore = document.querySelector("#high-score");
const hiddenNum = document.querySelector("#hidden-num");
const clearScoreBtn = document.querySelector("#clear-score");

// On page reload ---
renderHighScore(loadHighScoreLocalStorage());
resetGameData();
// ---

// Event Listeners ---
startGameBtn.onclick = newGameCallback;
clearScoreBtn.onclick = clearHighScore;
// ---

function clearHighScore() {
  clearhighScoreStorage();
  renderHighScore(0);
}

function newGameCallback() {
  beginGame();
  const gameData = returnLatestGameState();
  renderNewGameData(gameData);
  console.log(gameData.hiddenNum);
}

makeGuess.addEventListener("submit", (e) => {
  e.preventDefault();
  const gameData = returnLatestGameState();
  const inputElem = e.target.elements.guess;
  const guess = Number(inputElem.value);

  console.log(gameData);

  if (!gameData) {
    alert("You need to click Start Game");
    clearTextContentAndFocus(inputElem);
    return;
  }

  if (gameData.guessesRemaining <= 0 || gameData.isWon) {
    alert("Game has finished, start another one!");
    clearTextContentAndFocus(inputElem);
    return;
  }

  if (!isGuessValid(guess, gameData)) {
    alert(
      "Guess must be a number between the range specified by the difficulty"
    );
    clearTextContentAndFocus(inputElem);
    return;
  }

  if (gameData.guessHistory.includes(guess)) {
    alert("You've already guessed this number");
    clearTextContentAndFocus(inputElem);
    return;
  }

  processGuess(guess);
  clearTextContentAndFocus(inputElem);
});

function processGuess(guess) {
  const gameData = returnLatestGameState();
  updateGuessedHistory(guess);

  if (guess != gameData.hiddenNum) {
    removePoint();
    renderLostPoint(gameData);
  } else {
    gameIsWon();
    renderGameIsWon(gameData);
    updateHighScore();
    renderHighScore(loadHighScoreLocalStorage());
  }

  if (gameData.guessesRemaining <= 0 && !gameData.won) {
    renderGameIsLost(gameData);
  }
}
