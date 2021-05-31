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
  updateLastNumGuessed,
  //   isNewHighScore,
} from "./gameData";
import {
  isGuessValidNumber,
  isGuessCorrect,
  isGuessesRunOut,
} from "./validation";
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

// DOm Elements for Event Listeners
const startGameBtn = document.querySelector("#start-game");
const makeGuess = document.querySelector("#make-guess");
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
  renderNewGameData();
  //   console.log(gameData.hiddenNum);
}

makeGuess.addEventListener("submit", (e) => {
  e.preventDefault();
  const gameData = returnLatestGameState();
  const inputElem = e.target.elements.guess;
  const guess = Number(inputElem.value);

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

  if (!isGuessValidNumber(guess, gameData)) {
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
  updateGuessedHistory(guess);

  if (!isGuessCorrect(guess)) {
    removePoint();
    updateLastNumGuessed(guess);
    renderLostPoint();
  } else {
    gameIsWon();
    renderGameIsWon();
    updateHighScore();
    renderHighScore(loadHighScoreLocalStorage());
  }

  if (isGuessesRunOut()) {
    renderGameIsLost();
  }
}
