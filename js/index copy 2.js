let scrollValue = 0;
const effectsTop = document.querySelector('.home__effects--top');
const effectsBottom = document.querySelector('.home__effects--bottom');

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const imgWidth = 1500;
const imgHeight = 3000;

window.addEventListener('wheel', function (event) {
    if(scrollValue == 0) setBackgrounds();
    if (event.deltaY < 0) {
        if(scrollValue > 0) scrollValue--;
    }
    else if (event.deltaY > 0) {
        scrollValue++;
    }
    setTop(effectsBottom, 3);
    setTop(effectsTop, 9);
});

function setBackgrounds(){
    effectsTop.src = '/assets/effects/effect (' + getRandomImageIndex(3) + ').png';
    effectsBottom.src = '/assets/effects/effect (' + getRandomImageIndex(3) + ').png';
}

function setTop(element, value){
    let pixels = Math.floor(-scrollValue * value);
    if(-pixels > imgHeight){
        pixels = -Math.floor(-pixels % imgHeight);
    }
    element.style.top = (pixels + vh) + 'px';
}

function getRandomImageIndex(max) {
    let num = Math.floor(Math.random() * max) + 1;
    //num = addLeadingZeros(num);
    return num;
}

function addLeadingZeros(num) {
    if (num < 0) {
        const withoutMinus = String(num).slice(1);
        return '-' + withoutMinus.padStart(3, '0');
    }

    return String(num).padStart(3, '0');
}

function getRandomPos(element, maxX, maxY) {
    element.style.left = -Math.random() * maxX + 'px';
    element.style.top = -Math.random() * maxY + 'px';
}

