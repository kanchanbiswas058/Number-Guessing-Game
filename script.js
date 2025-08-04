let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const input = document.getElementById('guess-input');
const message = document.getElementById('message');
const checkBtn = document.getElementById('check-btn');
const playAgainBtn = document.getElementById('play-again');
const attemptsDisplay = document.getElementById('attempts');
const bestScoreDisplay = document.getElementById('best-score');

let bestScore = localStorage.getItem('bestScore');
if (bestScore !== null) {
  bestScoreDisplay.textContent = bestScore;
}

checkBtn.addEventListener('click', () => {
  const userGuess = Number(input.value);
  if (!userGuess || userGuess < 1 || userGuess > 100) {
    message.textContent = '❌ Enter a number between 1 and 100!';
    message.style.color = 'red';
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (userGuess === secretNumber) {
    message.textContent = `🎉 Correct! The number was ${secretNumber}`;
    message.style.color = 'green';

    if (bestScore === null || attempts < bestScore) {
      bestScore = attempts;
      localStorage.setItem('bestScore', bestScore);
      bestScoreDisplay.textContent = bestScore;
    }

    playAgainBtn.classList.remove('hidden');
    checkBtn.disabled = true;
    input.disabled = true;
  } else if (userGuess < secretNumber) {
    message.textContent = '📉 Too low!';
    message.style.color = 'orange';
  } else {
    message.textContent = '📈 Too high!';
    message.style.color = 'orange';
  }

  input.value = '';
  input.focus();
});

playAgainBtn.addEventListener('click', () => {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsDisplay.textContent = attempts;
  message.textContent = '';
  input.disabled = false;
  checkBtn.disabled = false;
  input.value = '';
  input.focus();
  playAgainBtn.classList.add('hidden');
});
