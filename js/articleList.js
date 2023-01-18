const main = document.querySelector('#postList');
const posts = document.querySelectorAll('.post');
let currentPost = 0;
let scrollEnabled = true;

let backgroundScrollValue = Math.floor(Math.random() * 2000);
const backgroundScrollInc = 1000;

main.addEventListener('wheel', handleScroll);

function handleScroll() {
    if (scrollEnabled) {
        currentPost++;
        if (currentPost >= posts.length) currentPost = 0;

        posts[currentPost].scrollIntoView({
            behavior: 'smooth'
        });

        backgroundScrollValue += Math.floor(Math.random() * backgroundScrollInc);
        main.style.backgroundPositionY = backgroundScrollValue + 'px';

        scrollEnabled = false;
        setTimeout(function() { enableScroll(); }, 1000);
    }
}

function enableScroll(){
    scrollEnabled = true;
}