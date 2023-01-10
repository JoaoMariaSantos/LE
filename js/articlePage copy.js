import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

const scrollEffectElements = document.querySelectorAll('#article *:not(div)');
const container = document.querySelector('#article');

console.log(scrollEffectElements);

const animatedImage = document.querySelector('#title');

/* const animatedImageTimeline = new ScrollTimeline({
    scrollOffsets:[
        { target: animatedImage, edge: "end", threshold: "1"},
        { target: animatedImage, edge: "start", threshold: "1"}
    ]
})

animatedImage.animate(
    {
        transform: ["rotateY(90deg)", "rotate(0)"]
    },
    {
        duration: 1,
        timeline: animatedImageTimeline,
    }
) */

scrollEffectElements.forEach(element => {
    const elementOffsetTop = element.offsetTop;
    const elementHeight = element.offsetHeight;
    const containerHeight = container.offsetHeight;


    /* const effectTimeline = new ScrollTimeline({
        scrollOffsets: [
            //CSS.px(elementOffsetTop + elementHeight - containerHeight + 300),
            //CSS.px(elementOffsetTop - 300),
            {target: element, edge:"end", threshold: '1'},
            {target: element, edge: "start", threshold: '1'}
        ],
    }); */

    const customTransform = getTransform(); //"random" transform for each element

    element.animate(
        {
            transform: ["scaleX(0)", "scaleX(1)"],
        },
        {
            duration: 1,
            easing: "linear", //cubic-bezier(0, 0.55, 0.45, 1)
            timeline: new ScrollTimeline({
                scrollOffsets: [
                    CSS.px(elementOffsetTop + elementHeight - containerHeight),
                    CSS.px(elementOffsetTop),
                    /* {target: element, edge:"end", threshold: "1"},
                    {target: element, edge: "start", threshold: "1"} */
                ],
            }),
        }
    );
})

function getTransform() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const translatedWidth = Math.floor(-windowHeight + Math.random() * windowHeight * 2);

    return ["translateX(" + translatedWidth + "px)", "translateX(0)"];
}