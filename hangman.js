const maxGuesses = 10;
let currentGuesses;

function printGuess(word) {
    const randomWordEl = document.querySelector('.random-word');

    for (let i = 0; i < word.length; i++) {
        randomWordEl.textContent += '_';
        // randomWordEl.textContent += word[i].toUpperCase();
    }
}

function keyClickHandler(guessedLetter) {
    const guessedKeyEl = document.querySelector(`.key-${guessedLetter}`);

    guessedKeyEl.setAttribute('disabled', '');
    console.log(guessedLetter);
}

function generateRandomWord() {
    const words = "The light blinded him. It was dark and he thought he was the only one in the area. The light shining in his eyes proved him wrong. It came from about hundred feet away and was shining so directly into his eyes he could not make out anything about the person holding the light. There was only one thing to do in this situation. He reached into his pocket and pulled out the flashlight of his own that was much stronger than the one currently blinding him. He turned it on and pointed it forward.".replaceAll('.', '').split(' ');
    const uniqueWords = [...new Set(words)];
    const randomWord = uniqueWords[Math.floor(Math.random() * uniqueWords.length)];

    printGuess(randomWord);
    console.log(randomWord);
}

function generateKeypad() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const keypadEl = document.querySelector('.keypad');

    alphabet.forEach(letter => {
        const keyEl = document.createElement('button');
        keyEl.classList.add('key', `key-${letter}`);
        keyEl.textContent = letter.toUpperCase();
        keypadEl.appendChild(keyEl);

        // keyEl.setAttribute('onclick', `keyClickHandler('${letter}')`);
        keyEl.addEventListener('click', () => keyClickHandler(`${letter}`));
    });
}

function render() {
    generateRandomWord();
    generateKeypad();
}

render();