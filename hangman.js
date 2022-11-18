const maxGuesses = 10;
let remainingGuesses = maxGuesses;
let randomWord = '';
let answer = [];

const gameStatus = document.querySelector('h2');
const stage = document.querySelector('.stage');
const randomWordEl = document.querySelector('.random-word');
const keypadEl = document.querySelector('.keypad');

function reset() {
    remainingGuesses = maxGuesses;
    randomWord = '';
    answer = [];

    gameStatus.textContent = '';
    gameStatus.removeAttribute('class');
    stage.textContent = '';
    randomWordEl.textContent = '';
    keypadEl.textContent = '';

    render();
}

function btnResetHandler() {
    const btnReset = document.querySelector('.btn-reset');
    btnReset.addEventListener('click', reset);
}

function updateStatus() {
    gameStatus.textContent = `Remaining guess ${remainingGuesses} of ${maxGuesses}`;
}

function generateRandomWord() {
    const words = "The light blinded him. It was dark and he thought he was the only one in the area. The light shining in his eyes proved him wrong. It came from about hundred feet away and was shining so directly into his eyes he could not make out anything about the person holding the light. There was only one thing to do in this situation. He reached into his pocket and pulled out the flashlight of his own that was much stronger than the one currently blinding him. He turned it on and pointed it forward.".replaceAll('.', '').split(' ');
    const uniqueWords = [...new Set(words)];
    randomWord = uniqueWords[Math.floor(Math.random() * uniqueWords.length)].toUpperCase();

    for (let i = 0; i < randomWord.length; i++) {
        randomWordEl.textContent += '_';
        answer[i] = '_';
    }

    console.log(randomWord);
}

function generateKeypad() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    alphabet.forEach(letter => {
        const keyEl = document.createElement('button');
        keyEl.classList.add('key', `key-${letter.toLowerCase()}`);
        keyEl.textContent = letter;
        keypadEl.appendChild(keyEl);

        // keyEl.setAttribute('onclick', `keyClickHandler('${letter}')`);
        // keyEl.onclick = () => keyClickHandler(`${letter}`);
        keyEl.addEventListener('click', () => keyClickHandler(`${letter}`));
    });
}

function draw() {
    hangman = ['base', 'post', 'bar', 'rope', 'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

    const stagePart = document.createElement('div');
    stagePart.className = hangman[(maxGuesses - remainingGuesses) - 1];
    stage.appendChild(stagePart);
}

function checkIfWon() {
    if (randomWord === answer.join('')) {
        document.body.className = 'won';
        gameStatus.textContent = 'You won!';
    } else {
        document.body.className = 'lost';
        gameStatus.textContent = 'You lost!';
    }

    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.setAttribute('disabled', ''));
}

function printGuess(guessedLetter) {
    let idx;

    randomWord.split('').forEach(() => {
        idx = randomWord.indexOf(guessedLetter);

        while (idx !== -1) {
            answer[idx] = guessedLetter;
            idx = randomWord.indexOf(guessedLetter, idx + 1);
        }
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
    // guessedKeyEl.onclick = null;

    if (randomWord.indexOf(guessedLetter) === -1) {
        --remainingGuesses;
        updateStatus();
        draw();
        printGuess(guessedLetter);
    } else {
        printGuess(guessedLetter);
    }
}

function render() {
    updateStatus();
    generateRandomWord();
    generateKeypad();
}

btnResetHandler();
render();
