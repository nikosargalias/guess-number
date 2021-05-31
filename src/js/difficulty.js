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

export { returnRangeBasedOnDifficulty, generateRandomNum };
