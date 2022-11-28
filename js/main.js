const synth = new Tone.Synth().toDestination();

function playTone (note) {
    synth.triggerAttackRelease(note, "8n");
    Tone.start();
}

function randomArrayElement (array) {
    return array[Math.floor(Math.random() * array.length)];
}

function selectRandomToneAndPlay () {
    const cell = randomArrayElement(Array.from(cells));
    const index = cell.dataset.index;

    gameState.patternState.push(index);

    const clonedPattern = gameState.patternState.slice(0);
    console.log(clonedPattern);

    const patternInterval = setInterval(() => {
        console.log(`Playing pattern`);
        const i = clonedPattern.shift();

        cells[i].classList.toggle("on");

        playTone(tones[i]);

        setTimeout(() => cells[i].classList.toggle("on"), 500);

        if (clonedPattern.length === 0) clearInterval(patternInterval);
    }, 800);
}

function cellActivated (event) {
    const currentCell = event.target;

    gameState.playerState.push(currentCell.dataset.index);

    playTone(tones[currentCell.dataset.index]);

    if (gameState.patternState.length === gameState.playerState.length) {
        if (gameState.patternState.join(",") === gameState.playerState.join(",")) {
            gameState.playerState = [];

            selectRandomToneAndPlay();

            return true;
        }

        alert("GAME OVER");
    }
}

const tones = ["D5", "A4", "B4", "G4"];
const cells = document.querySelectorAll(".cell");
const gameState = {
    patternState: [],
    playerState: []
};

cells.forEach((cell, index) => {
    cell.dataset.index = index;

    cell.addEventListener("click", cellActivated);
});

const keys = ["KeyA", "KeyS", "KeyD", "KeyF"];
document.onkeydown = event => {
    const index = keys.indexOf(event.code);
    if (index !== -1) {
        cells[index].click();
        cells[index].classList.toggle("on");
    }
};

document.onkeyup = event => {
    const index = keys.indexOf(event.code);
    if (index !== -1) {
        cells[index].classList.toggle("on");
    }
};

document.querySelector("button").onclick = () => {
    gameState.patternState = [];
    gameState.playerState = [];

    selectRandomToneAndPlay();
}
