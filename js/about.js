let text = document.getElementById('about__text');

//move text div//
document.onmousemove = function(event){
    let disloc = 9.5;
    let x = event.clientX * disloc / window.innerWidth + '%';
    let y = event.clientY * disloc / window.innerHeight + '%';

   text.style.left = x;
   text.style.top = y;
    text.style.transform = 'translate('+x+','+y+')';
}

    let imgs = document.querySelectorAll('#about__img > img');
    let pX = [];
    let pY = [];
    let speedX = [];
    let speedY = [];

    let limits = 150;
    let speed = 0.23;

    for(let i = 0; i < imgs.length; i++){
        imgs[i].style.width = Math.random()*7 + 'vw';
        pX[i] = Math.random()*limits;
        pY[i] = Math.random()*limits;
        
        speedX[i] = Math.random() * (speed + speed) - speed;
        speedY[i] = Math.random() * (speed + speed) - speed;
    }


    function moveImgs(){
       for(let j = 0; j < imgs.length; j++){
        if(pX[j] >= limits || pX[j] <= 100-limits) speedX[j] = -speedX[j];
        if(pY[j] >= limits || pY[j] <= 100-limits) speedY[j] = -speedY[j];

        pX[j] = pX[j] + speedX[j];
        pY[j] = pY[j] + speedY[j];

        imgs[j].style.left = pX[j] + 'vw';
        imgs[j].style.top = pY[j] + 'vh';

        console.log(pX[j]);
    }
    }
    
   setInterval(() => {
       moveImgs();
      }, 1000 / 60);
