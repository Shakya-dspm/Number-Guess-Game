let guessInput = document.getElementById("guess-Input");
let guessButton = document.getElementById("guess-button");
let guessForm = document.getElementById("guess-form");
let attemptCount = document.getElementById("attempt-count");
let playAgainButton = document.getElementById("play-again");
let feedback = document.getElementById("feedback");

let secretNumber = generateSecretNumber();
let attempts = 0;
let gameWon = false;

function generateSecretNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function checkGuess(e) {
    // Prevent default form reload behavior
    if (e) e.preventDefault();

    if (gameWon) {
        alert("You've already won! Please click 'Play Again' to start a new game.");
        return;
    }

    // Read the value from the input field
    const guess = Number(guessInput.value);

    // Validate input
    if (!guessInput.value || guess < 1 || guess > 100) {
        feedback.innerText = "Your guess must be between 1 and 100.";
        guessInput.focus();
        return;
    }

    attempts++;
    attemptCount.innerText = `Attempts: ${attempts}`;

    if (guess === secretNumber) {
        gameWon = true;
        guessInput.disabled = true;
        guessButton.disabled = true;
        feedback.innerText = "🎉 Correct! You guessed the number!";
    } else if (guess < secretNumber) {
        feedback.innerText = "Too low! Try a higher number.";
    } else {
        feedback.innerText = "Too high! Try a lower number.";
    }

    if (!gameWon) {
        guessInput.value = "";
        guessInput.focus();
    }
}

function resetGame() {
    secretNumber = generateSecretNumber();
    attempts = 0;
    gameWon = false;
    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;
    attemptCount.innerText = "Attempts: 0";
    feedback.innerText = "Make a guess to get started.";
    guessInput.focus();
}

guessForm.addEventListener("submit", checkGuess);
playAgainButton.addEventListener("click", resetGame);