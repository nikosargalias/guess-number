import { returnLatestGameState } from "./gameData";

function isGuessValidNumber(guess, gameData) {
  if (typeof guess != "number") {
    return false;
  } else if (guess > gameData.numberRange || guess <= 0) {
    return false;
  } else {
    return true;
  }
}

function isGuessCorrect(guess) {
  const { hiddenNum } = returnLatestGameState();
  if (guess == hiddenNum) {
    return true;
  }
  return false;
}

function isGuessesRunOut() {
  const gameData = returnLatestGameState();
  if (gameData.guessesRemaining <= 0 && !gameData.isWon) {
    return true;
  }
  return false;
}

export { isGuessValidNumber, isGuessCorrect, isGuessesRunOut };
