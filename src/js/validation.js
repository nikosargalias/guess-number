import { returnLatestGameState } from "./gameData";

function isGuessValid(guess, gameData) {
  if (typeof guess != "number") {
    return false;
  } else if (guess > gameData.numberRange || guess <= 0) {
    return false;
  } else {
    return true;
  }
}

export { isGuessValid };
