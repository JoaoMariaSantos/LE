const main = document.querySelector('#postList');
const posts = document.querySelectorAll('.post');
let currentPost = 0;

main.addEventListener('wheel', handleScroll);

function handleScroll(){
    currentPost ++;
    if(currentPost >= posts.length) currentPost = 0;
    console.log(posts[currentPost]);
    posts[currentPost].scrollIntoView({
        behavior: 'smooth'
    });
}