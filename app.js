/*
 RULES:
 Player must guess number between min and max
 Player has certain amount of guesses
 Notify the player of guesses remaining
 Notify player of the correct or wrong
 Let player to choose to play again

*/

//Game Values

let min = 1, 
    max = 10,
    winNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements

const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input');
      message = document.querySelector('.message');

//Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

//Play again Event Listner

game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = (parseInt(guessInput.value));

  //Validate if num is correct
  if (isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter number betwenn ${min} and ${max}!`, 'red');
  }

  //Check if num is guess
  if (guess === winNum) {
    
    gameOver(true, `${winNum} is correct, you win!`);
    message.style.color = 'green';
  } else {
    //if wrong
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(false, `Game over! You lost! Winning number was ${winNum}`, 'red')
    } else {
      //game continues
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left!`, 'red');
    }

  }
});

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function gameOver(won, msg) {
  let color;

  won === true ? color = "green" : color = "red";

  guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //set message
    setMessage(msg);

    //Play again
    guessBtn.textContent = 'Play Again';
    guessBtn.className += 'play-again';

}