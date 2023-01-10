const elements = document.querySelectorAll('#article *:not(div)');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        manage(entry.target, entry.isIntersecting);
    })
}, {
    threshold: 1,
});

elements.forEach(element => {
    observer.observe(element);
})

function manage(elem, state) {
    let animation;
    let timing = {
        duration: 2000,
        iterations: 1,
    };


    if (state) {
        animation = [
            { transform: 'translateX(300%)' },
            { transform: 'translateX(0%)' }
        ]
    }
    else {
        animation = [
            { transform: 'translateX(0%)' },
            { transform: 'translateX(300%)' }
        ]
    }

    elem.animate(animation, timing);
}