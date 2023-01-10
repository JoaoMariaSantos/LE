//https://www.youtube.com/watch?v=VgS5CP7zlXE&ab_channel=KevinPowell

import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

const scrollEffectElements = document.querySelectorAll('#article *:not(div)');
const container = document.querySelector('#article');

const horizontalMagnitude = 0.2;
const verticalMagnitude = 0.1;

console.log(container);



scrollEffectElements.forEach(elem => {
    const enterTransform = getTransform();

    elem.animate(
        {
            transform: enterTransform
        },
        {
            duration: 1,
            timeline: new ViewTimeline({
                subject: elem,
                axis: "vertical",
            }),
            delay: { phase: "enter", percent: CSS.percent(20) },
            endDelay: { phase: "enter", percent: CSS.percent(120) }
        })

    const exitTransform = enterTransform.reverse();

    elem.animate(
        {
            transform: exitTransform
        },
        {
            duration: 1,
            timeline: new ViewTimeline({
                subject: elem,
                axis: "vertical",
            }),
            delay: { phase: "exit", percent: CSS.percent(-10) },
            endDelay: { phase: "exit", percent: CSS.percent(100) }
        })
})

function getTransform() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const translatedWidth = Math.floor(-windowWidth * horizontalMagnitude + Math.random() * (windowWidth * horizontalMagnitude * 2));

    const translatedHeight = Math.floor(-windowHeight * verticalMagnitude + Math.random() * (windowHeight * verticalMagnitude * 2));

    return ["translate(" + translatedWidth + "px, " + translatedHeight+ "px) scale(0.8)",
            "translate(0) scale(1)"];
}