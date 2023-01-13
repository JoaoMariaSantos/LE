//https://www.youtube.com/watch?v=VgS5CP7zlXE&ab_channel=KevinPowell
//https://www.bram.us/2022/10/27/scroll-linked-animations-with-scrolltimeline-and-viewtimeline/
//https://codepen.io/bramus/pen/WNzZmXL

import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

//elementos a mexer
let scrollEffectElements = document.querySelectorAll('#article *:not(div)');

//n elementos a ignorar (titulo e autor)
const nElementsToIgnore = 2;

//images
const nImages = 500;
const loadedCheck = new Array(nImages);

//container
const container = document.querySelector('#article');

//valores a multiplicar por largura/altura da janela utilizados no moveRandomly()
const horizontalMoveMagnitude = 0.3;
const verticalMoveMagnitude = 0.05;

//valores a multiplicar por largura/altura da janela utilizados no getTransform()
const horizontalEffectMagnitude = 0.07;
const verticalEffectMagnitude = 0.08;

//window size
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

//getImages(nImages);

let nLoaded = 0;
getImages(nImages);
addScrollAnimations(scrollEffectElements);

function getImages(n) {
    const folder = container.classList[0];
    const existingImages = parseInt(container.classList[1]);

    for (let i = 0; i < n; i++) {
        const img = document.createElement('img');
        img.className = "article--effect";
        if(Math.random()*1 < 0.3) img.classList.add("article--effect__colored")
        img.style.position = "absolute";
        img.style.left = Math.floor(- 100 + Math.random() * container.clientWidth + 100) + 'px';
        img.style.top = Math.floor(Math.random() * container.scrollHeight) + 'px';
        img.src = "/assets/" + folder + "/img (" + (Math.floor(Math.random() * existingImages) + 1) + ").png";
        container.append(img);

        //loadedCheck[i] = false;
        img.addEventListener('load', imgLoaded(i));
    }
}

function imgLoaded(i) {
    //loadedCheck[i] = true;
    nLoaded ++;
    console.log(nLoaded + ' / ' + nImages);
    //if (!loadedCheck.includes(undefined)) addScrollAnimations(document.querySelectorAll('#article .article--effect'));
}

function moveRandomly(elements) { //mexe os elementos um bcd aleatoriamente

    for (let i = nElementsToIgnore - 1; i < elements.length; i++) {
        elements[i].style.left = Math.floor(-windowWidth * horizontalMoveMagnitude + Math.random() * (windowWidth * horizontalMoveMagnitude * 2)) + 'px';
        elements[i].style.top = Math.floor(-windowHeight * verticalMoveMagnitude + Math.random() * (windowHeight * verticalMoveMagnitude * 2)) + 'px';
    }

    addScrollAnimations(document.querySelectorAll('#article *:not(div)'));
}

function addScrollAnimations(elements) {
    elements.forEach(elem => {

        const enterTransform = getTransform();
        const enterFilter = getFilter();

        elem.animate( //animação entrada do elemento
            {
                transform: enterTransform, //transformações. dá com qq propriedade css
                //filter: enterFilter
            },
            {
                easing: 'cubic-bezier(0, 0.55, 0.45, 1)',
                duration: 1,
                timeline: new ViewTimeline({
                    subject: elem,
                    axis: "vertical",
                }),
                delay: { phase: "enter", percent: CSS.percent(0) }, //percentagem do elemento que entrou na div
                endDelay: { phase: "enter", percent: CSS.percent(200) }
            })

        const exitTransform = enterTransform.reverse();
        const exitFilter = enterFilter.reverse();

        if (elem.id == 'title') {
            elem.animate( //animação saída do elemento
                {
                    transform: exitTransform,
                    filter: exitFilter
                },
                {
                    easing: 'cubic-bezier(0, 0.55, 0.45, 1)',
                    duration: 1,
                    timeline: new ViewTimeline({
                        subject: elem,
                        axis: "vertical",
                    }),
                    delay: { phase: "exit", percent: CSS.percent(0) }, //percentagem do elemento que saiu da div
                    endDelay: { phase: "exit", percent: CSS.percent(200) }
                })
        } else {

            elem.animate( //animação saída do elemento
                {
                    transform: exitTransform,
                    filter: exitFilter
                },
                {
                    easing: 'cubic-bezier(0, 0.55, 0.45, 1)',
                    duration: 1,
                    timeline: new ViewTimeline({
                        subject: elem,
                        axis: "vertical",
                    }),
                    delay: { phase: "exit", percent: CSS.percent(0) }, //percentagem do elemento que saiu da div
                    endDelay: { phase: "exit", percent: CSS.percent(300) }
                })
        }
    })

}

function getTransform() { //gera valores para o transform
    const translatedWidth = Math.floor(-windowWidth * horizontalEffectMagnitude + Math.random() * (windowWidth * horizontalEffectMagnitude * 2));

    //const translatedHeight = Math.floor(-windowHeight * verticalEffectMagnitude + Math.random() * (windowHeight * verticalEffectMagnitude * 2));
    const translatedHeight = -Math.floor(Math.random() * (windowHeight * verticalEffectMagnitude * 2));

    return ["translate(" + translatedWidth + "px, " + translatedHeight + "px) scale(0.8)",
        "translate(0) scale(1)"];
}

function getFilter() {
    return ["blur(0.5px)",
        "blur(0)"];
}