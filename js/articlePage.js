//https://www.youtube.com/watch?v=VgS5CP7zlXE&ab_channel=KevinPowell
//https://www.bram.us/2022/10/27/scroll-linked-animations-with-scrolltimeline-and-viewtimeline/
//https://codepen.io/bramus/pen/WNzZmXL

import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

//elementos a mexer
let scrollEffectElements = document.querySelectorAll('#article *:not(div)');

//n elementos a ignorar (titulo e autor)
const nElementsToIgnore = 2;

//images
const nImages = 25;
const loadedCheck = new Array(nImages);

//container
const container = document.querySelector('#article');

//valores a multiplicar por largura/altura da janela utilizados no moveRandomly()
const horizontalMoveMagnitude = 0.3;
const verticalMoveMagnitude = 0.05;

//valores a multiplicar por largura/altura da janela utilizados no getTransform()
const horizontalEffectMagnitude = 0.2;
const verticalEffectMagnitude = 0.3;

//window size
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

getImages(nImages);

function getImages(n) {
    const folder = container.classList[0];
    const existingImages = parseInt(container.classList[1]);

    for (let i = 0; i < n; i++) {
        const img = document.createElement('img');
        img.style.marginLeft = 'auto';
        img.style.marginTop = 'auto';
        img.src = "/assets/" + folder + "/img (" + (Math.floor(Math.random() * existingImages) + 1) + ").png";
        container.insertBefore(img, scrollEffectElements[nElementsToIgnore + Math.floor(Math.random() * (scrollEffectElements.length - nElementsToIgnore))]);

        loadedCheck[i] = false;
        img.addEventListener('load', imgLoaded(i));
    }
}

function imgLoaded(i) {
    loadedCheck[i] = true;

    if (!loadedCheck.includes(undefined)) moveRandomly(document.querySelectorAll('#article *:not(div)'));
}

function moveRandomly(elements) { //mexe os elementos um bcd aleatoriamente

    for (let i = nElementsToIgnore - 1; i < elements.length; i++) {
        elements[i].style.left = Math.floor(-windowWidth * horizontalMoveMagnitude + Math.random() * (windowWidth * horizontalMoveMagnitude * 2)) + 'px';
        elements[i].style.top = Math.floor(-windowHeight * verticalMoveMagnitude + Math.random() * (windowHeight * verticalMoveMagnitude * 2)) + 'px';
    }

    addScrollAnimations(document.querySelectorAll('#article *:not(div)'));
}

function addScrollAnimations(elements) {

    console.log(elements);

    elements.forEach(elem => {

        const enterTransform = getTransform();

        elem.animate( //animação entrada do elemento
            {
                transform: enterTransform //transformações. dá com qq propriedade css
            },
            {
                duration: 1,
                timeline: new ViewTimeline({
                    subject: elem,
                    axis: "vertical",
                }),
                delay: { phase: "enter", percent: CSS.percent(0) }, //percentagem do elemento que entrou na div
                endDelay: { phase: "enter", percent: CSS.percent(200) }
            })

        const exitTransform = enterTransform.reverse();

        elem.animate( //animação saída do elemento
            {
                transform: exitTransform
            },
            {
                duration: 1,
                timeline: new ViewTimeline({
                    subject: elem,
                    axis: "vertical",
                }),
                delay: { phase: "exit", percent: CSS.percent(-100) }, //percentagem do elemento que saiu da div
                endDelay: { phase: "exit", percent: CSS.percent(100) }
            })
    })

}

function getTransform() { //gera valores para o transform
    const translatedWidth = Math.floor(-windowWidth * horizontalEffectMagnitude + Math.random() * (windowWidth * horizontalEffectMagnitude * 2));
    //const translatedWidth = 0;

    const translatedHeight = Math.floor(-windowHeight * verticalEffectMagnitude + Math.random() * (windowHeight * verticalEffectMagnitude * 2));
    //const translatedHeight = windowHeight;

    return ["translate(" + translatedWidth + "px, " + translatedHeight + "px) scale(0.95)",
        "translate(0) scale(1)"];
}