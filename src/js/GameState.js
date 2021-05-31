import { returnRangeBasedOnDifficulty, generateRandomNum } from "./difficulty";

class GameState {
  constructor(difficulty) {
    this.numberRange = returnRangeBasedOnDifficulty(difficulty);
    this.hiddenNum = generateRandomNum(this.numberRange);
    this.guessesRemaining = this.numberRange != 5 ? 10 : 5;
    this.isWon = false;
    this.lastNumGuessed;
    this.guessHistory = [];
  }
}

export { GameState };
