const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

function generateRandomWord() {
    const randomWordEl = document.getElementById('radom-word');
}

function generateKeypad() {
    const keypadEl = document.getElementById('keypad');
    alphabet.forEach(letter => {
        const key = document.createElement('button');
        key.classList.add('key', `key-${letter.toLowerCase()}`);
        key.textContent = letter;
        keypadEl.appendChild(key);
    });
}

function render() {
    generateRandomWord();
    generateKeypad();
}

render();