import { GameState } from "./GameState";
import {
  saveGameToLocalStorage,
  loadGameLocalStorage,
  saveHighScoreToLocalStorage,
  loadHighScoreLocalStorage,
} from "./local-storage";

function beginGame(difficulty) {
  const gameData = new GameState(difficulty);
  saveGameToLocalStorage(gameData);
}

function updateGuessedHistory(guess) {
  updateGameData((gameData) => {
    gameData.guessHistory.push(guess);
  });
}

function updateLastNumGuessed(guess) {
  updateGameData((gameData) => {
    gameData.lastNumGuessed = guess;
  });
}

function gameIsWon() {
  updateGameData((gameData) => {
    gameData.isWon = true;
  });
}

function updateHighScore() {
  const { guessesRemaining } = loadGameLocalStorage();
  console.log(guessesRemaining);
  const highScoreCur = loadHighScoreLocalStorage();
  const newhighScore = guessesRemaining;
  if (newhighScore > highScoreCur) {
    saveHighScoreToLocalStorage(newhighScore);
  }
}

function removePoint() {
  updateGameData((gameData) => {
    gameData.guessesRemaining--;
  });
}

function updateGameData(fn) {
  const gameData = loadGameLocalStorage();
  fn(gameData);
  saveGameToLocalStorage(gameData);
}

function returnLatestGameState() {
  return loadGameLocalStorage();
}

function resetGameData() {
  let gameData = 0;
  saveGameToLocalStorage(gameData);
}

function clearhighScoreStorage() {
  saveHighScoreToLocalStorage(0);
}

export {
  updateLastNumGuessed,
  beginGame,
  updateGuessedHistory,
  updateHighScore,
  removePoint,
  gameIsWon,
  returnLatestGameState,
  resetGameData,
  clearhighScoreStorage,
};
