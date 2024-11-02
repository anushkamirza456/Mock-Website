//am2789

document.addEventListener("DOMContentLoaded", function() {

    // define the DOM elements.
    const radioRange = document.querySelectorAll('input[type="radio"]');
    const startButton = document.getElementById('startButton');
    const guessBox = document.getElementById('guessBox');
    const guessRange = document.getElementById('guessRange');
    const guessInput = document.getElementById('guessInput');
    const checkGuess = document.getElementById('checkGuess');
    const guessesRemainDisplay = document.getElementById('guessRemain');
    const guessesList = document.getElementById('guessesList');
    const guessesBank = document.getElementById('guessesBank');
    const guessesContainer = document.getElementById('guessesContainer');
    const hintMessageElement = document.getElementById('hintMessage');

    // create variables that hold values for user and game count,
    let randNum, guessNum;

    // start button only clickable if option is selected.
    for (let i = 0; i < radioRange.length; i++) {
        const input = radioRange[i];
        input.addEventListener('change', function() {
            startButton.disabled = false;
        });
    }

    startButton.addEventListener('click', function() {
        let selectedRange;
        // find specific range clicked.
        for (let i = 0; i < radioRange.length; i++) {
            if (radioRange[i].checked) {
                selectedRange = radioRange[i].value;
                break;
            }
        }
        // hide all other ranges and show the selected range.
        beginGame(selectedRange);
        hideElements();
    });

    function beginGame(range) {
        // generate random number for the selected range.
        randNum = Math.floor(Math.random() * range) + 1;
        guessNum = range == 10 ? 3 : range == 100 ? 7 : 10;
        guessRange.textContent = range;
        guessesRemainDisplay.textContent = guessNum;
        guessBox.style.display = 'block';
        startButton.style.display = 'none'; // now hide the start button.
        optionsBox.style.display = 'none'; 
        guessInput.focus();
    }

    function hideElements() {
        const optionsText = document.querySelector('p');
        optionsText.style.display = 'none';
    
        const labels = document.querySelectorAll('label');
        for (let i = 0; i < labels.length; i++) {
            labels[i].style.display = 'none';
        }
    
        for (let i = 0; i < radioRange.length; i++) {
            radioRange[i].style.display = 'none';
        }
    }

    checkGuess.addEventListener('click', function() { // use for loop for efficency.
        const playerGuess = parseInt(guessInput.value);

        // checking to see if the guess is within the range.
        if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > parseInt(guessRange.textContent)) {
            displayHint('Please enter a valid number.');
            return;
        }

        // if correct output this
        if (playerGuess === randNum) {
            endGame('Congratulations!');
            recordGuess(playerGuess, 'This is correct!');
            return;
        }

        // if answer higher/lower than randNum then give high/low hint.
        const hintMessage = playerGuess > randNum ? 'Too high. Try again!' : 'Too low. Try again!';
        displayHint(hintMessage);
        recordGuess(playerGuess, hintMessage);

        guessNum--;
        guessesRemainDisplay.textContent = guessNum;

        if (guessNum === 0) {
            endGame('Sorry! No more guesses left.');
        }

        if (guessesContainer.style.display === 'none') {
            guessesContainer.style.display = 'block';
        }
    });

    function displayHint(message) {
        hintMessageElement.textContent = message;
        hintMessageElement.style.color = message.includes('Too high') || message.includes('Too low') ? 'red' : 'inherit';
    }

    function recordGuess(guess, result) {
        const guessItem = document.createElement('li');
        guessItem.textContent = `${guess}`;
        guessesList.appendChild(guessItem);
        guessInput.value = '';

        const guessBankItem = document.createElement('li');
        guessBankItem.textContent = `Guess ${guess}: ${result}`;
        guessesBank.appendChild(guessBankItem);
    }

    // once guesses are done, a pop up is displayed.
    function endGame(message) {
        setTimeout(function() {
            alert(message);
            const playAgain = confirm('Would you like to play again?');
            if (playAgain) {
                location.reload(); // use to show first page.
            }
        }, 500);
        hintMessageElement.textContent = message;
        hintMessageElement.style.color = message.includes('Congratulations!') ? 'green' : 'inherit'; // if guessed correctly.
    }
});