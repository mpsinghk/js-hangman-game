const maxGuesses = 10;
let remainingGuesses = maxGuesses;
let randomWord = '';
let answer = [];

const randomWordEl = document.querySelector('.random-word');
const gameStatus = document.querySelector('h2');

function reset() {
    remainingGuesses = maxGuesses;
    randomWord = '';
    answer = [];
    gameStatus.textContent = '';
    render();
}

function checkIfWon() {
    const keys = document.querySelectorAll('.key');

    if (randomWord === answer.join('')) {
        gameStatus.className = 'won';
        gameStatus.textContent = 'You won!';
    } else {
        gameStatus.className = 'lost';
        gameStatus.textContent = 'You lost!';
    }

    keys.forEach(key => key.setAttribute('disabled', ''));
}

function printGuess(guessedLetter) {
    let position;

    randomWord.split('').forEach(() => {
        position = randomWord.indexOf(guessedLetter);
        position >= 0 ? answer[position] = guessedLetter : '_';
    });

    if (answer.join('') !== '') {
        randomWordEl.textContent = answer.join('');
    }

    if (remainingGuesses <= 0 || randomWord === answer.join('')) {
        checkIfWon();
    }
}

function keyClickHandler(guessedLetter) {
    const guessedKeyEl = document.querySelector(`.key-${guessedLetter.toLowerCase()}`);
    guessedKeyEl.setAttribute('disabled', '');
    // guessedKeyEl.removeAttribute('onclick');

    remainingGuesses = randomWord.indexOf(guessedLetter) != -1 ? remainingGuesses : --remainingGuesses;
    printGuess(guessedLetter);
    console.log(guessedLetter, remainingGuesses);
}

function generateRandomWord() {
    const words = "The light blinded him. It was dark and he thought he was the only one in the area. The light shining in his eyes proved him wrong. It came from about hundred feet away and was shining so directly into his eyes he could not make out anything about the person holding the light. There was only one thing to do in this situation. He reached into his pocket and pulled out the flashlight of his own that was much stronger than the one currently blinding him. He turned it on and pointed it forward.".replaceAll('.', '').split(' ');
    const uniqueWords = [...new Set(words)];
    randomWord = uniqueWords[Math.floor(Math.random() * uniqueWords.length)].toUpperCase();

    randomWordEl.textContent = '';
    for (let i = 0; i < randomWord.length; i++) {
        randomWordEl.textContent += '_';
        answer[i] = '_';
    }

    console.log(randomWord);
}

function generateKeypad() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    const keypadEl = document.querySelector('.keypad');
    keypadEl.textContent = '';

    alphabet.forEach(letter => {
        const keyEl = document.createElement('button');
        keyEl.classList.add('key', `key-${letter.toLowerCase()}`);
        keyEl.textContent = letter;
        keypadEl.appendChild(keyEl);

        // keyEl.setAttribute('onclick', `keyClickHandler('${letter}')`);
        keyEl.addEventListener('click', () => keyClickHandler(`${letter}`));
    });
}

function btnResetHandler() {
    const btnReset = document.querySelector('.btn-reset');
    btnReset.addEventListener('click', reset);
}

function render() {
    generateRandomWord();
    generateKeypad();
}

btnResetHandler();
render();