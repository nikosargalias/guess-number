function saveGameToLocalStorage(gameData) {
  const JSONData = JSON.stringify(gameData);
  window.localStorage.setItem("gameInstance", JSONData);
}

function loadGameLocalStorage() {
  const gameData = JSON.parse(window.localStorage.getItem("gameInstance"));
  return gameData;
}

function saveHighScoreToLocalStorage(highScore) {
  const JSONData = JSON.stringify(highScore);
  window.localStorage.setItem("highScore", JSONData);
}

function loadHighScoreLocalStorage() {
  const highScore = JSON.parse(window.localStorage.getItem("highScore"));
  return highScore;
}

// localStorage.clear();

export {
  saveGameToLocalStorage,
  loadGameLocalStorage,
  saveHighScoreToLocalStorage,
  loadHighScoreLocalStorage,
};
