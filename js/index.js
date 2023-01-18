const container = document.querySelector('#home__text--interaction');
const letterDivs = container.querySelectorAll('.glyph');

const nLetters = 9;
const nPhases = 11;

let spriteW = 144;
let spriteH = 231;

const spriteURL = '/assets/spritesheet/spriteSheet_03.png'

let letterTracker = new Array(nLetters);

//

let backgroundScroll = 0;
const backgroundScrollInc = 97;

setupTracker();

function setupTracker() {
    fillTracker();
    window.addEventListener('wheel', managePhases);
    window.addEventListener('wheel', handleBackground);
    updateDivs();
    applyClickListener();
}

function fillTracker(){
    for(let i = 0; i < letterTracker.length; i++){
        letterTracker[i] = {phase: 0, direction: true};
    }
}

function managePhases() {

    for(let i = 0; i < letterTracker.length; i++){
        let toAdd = Math.floor(Math.random() * 2);

        if (!letterTracker[i].direction) toAdd *= -1;

        let newPhase = letterTracker[i].phase + toAdd;

        if (newPhase < 0 || newPhase > (nPhases - 1)) {
            if (newPhase < 0) {
                letterTracker[i].phase = - (letterTracker[i].phase + toAdd);
            } else {
                letterTracker[i].phase = (nPhases-1) - (letterTracker[i].phase + toAdd - (nPhases-1));
            }
            letterTracker[i].direction = !letterTracker[i].direction;
        }
        else letterTracker[i].phase = newPhase;
    }

    updateDivs();
}

function updateDivs() {
    for(let i = 0; i < letterTracker.length; i++){
        const letterX = (nLetters * spriteW) - (i * spriteW);
        const letterY = (nPhases* spriteH) - (letterTracker[i].phase * spriteH);

        letterDivs[i].style.backgroundPosition = letterX + 'px ' + letterY + 'px';
    }
}

function applyClickListener(){
    letterDivs.forEach((div, i) => {
        div.addEventListener('click', function(){
            setRandomLetter(i);
        })
    })
}

function setRandomLetter(i){
    letterTracker[i].phase = Math.floor(Math.random()*(nPhases));
    updateDivs();
}

function handleBackground(){
    backgroundScroll += Math.floor(Math.random() * backgroundScrollInc);
    document.querySelector('#home__text').style.backgroundPositionY = backgroundScroll + 'px';
}