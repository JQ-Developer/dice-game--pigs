'use strict';

//SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

//STARTING

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.getElementById(`score--0`).textContent = score[activePlayer];
  document.getElementById(`score--1`).textContent = score[activePlayer];
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

//SWTCH PLAYERS

const switchPLayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//ROLLING DICE MECHANISM
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. GENERATING RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. DISPLAY DICE

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. CHECK FOR ROLLED 1: IF TRUE

    if (dice !== 1) {
      //ADD DICE TO CURRENT SCORE

      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //SWITCH TO NEXT PLAYER

      switchPLayer();
    }
  }
});

//HOLD OPTION
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2. CHECK IF PLAYER'S SCORE IS >=100

    if (score[activePlayer] >= 100) {
      // FINISH THE GAME

      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. SWITCH TO NEXT PLAYER

      switchPLayer();
    }
  }
});

//RESET GAME
btnNew.addEventListener('click', init);
