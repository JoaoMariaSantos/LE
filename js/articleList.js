const main = document.querySelector('#postList');
const posts = document.querySelectorAll('.post');
let currentPost = 0;

let backgroundScrollValue = 0;
const backgroundScrollInc = 1000;

main.addEventListener('wheel', handleScroll);

function handleScroll(){
    currentPost ++;
    if(currentPost >= posts.length) currentPost = 0;

    posts[currentPost].scrollIntoView({
        behavior: 'smooth'
    });

    backgroundScrollValue += Math.floor(Math.random()*backgroundScrollInc);
    main.style.backgroundPositionY = backgroundScrollValue + 'px';
}