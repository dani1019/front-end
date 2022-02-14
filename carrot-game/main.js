const bug = document.querySelector('.bug');
const carrot = document.querySelector('.carrot');

document.addEventListener('click',(event)=>{
    const imgUrl = 'img/carrot.png';
    let imgs = [];
    let imgPos = [];

    for (let i = 0; i < 50; i++){
        // imgs.push(new Image());
        // imgs[i].scr = imgUrl;
        // imgs[i].style.position = 'absolute';

        imgPos[i] = [Math.floor(Math.random() * window.innerWidth),
                    Math.floor(Math.random() * window.innerHeight)];
        console.log(imgPos[i]);  

        bug.style.left = imgPos[i][0] + 'px';
        bug.style.top = imgPos[i][1] + 'px';
        // document.body.appendChild(imgs[i]);
        // console.log(imgs[i].style.left,imgs[i].style.top);
    }


});