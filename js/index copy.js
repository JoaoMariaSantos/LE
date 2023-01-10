let scrollValue = 0;
const effectsDiv = document.querySelector('#home__effects');

window.addEventListener('wheel', function (event) {
    if (event.deltaY < 0) {
        scrollValue--;
    }
    else if (event.deltaY > 0) {
        scrollValue++;
    }
    getRandomPos(effectsDiv, 300, 300)
    effectsDiv.style.backgroundImage = 'url(/assets/effects/effect_' + getRandomImageIndex(3) + '.png)';
});




function getRandomImageIndex(max) {
    let num = Math.floor(Math.random() * max) + 1;
    num = addLeadingZeros(num);
    console.log(num);
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

