const bug = document.querySelector('.bug');
const carrot = document.querySelector('.carrot');
const button__play = document.querySelector('.button__play');
const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d');

function game__start(){
    button__play.innerHTML=`
    <i class="fas fa-stop"></i>
    `
    image__make();
}
function image__make(){
    let imgs = [];
    let width = 0;
    let height = 0;
    for (let i = 0; i < 11; i++){
        width = Math.floor(Math.random() * window.innerWidth);
        height = Math.floor(Math.random() * window.innerHeight);
        imgs.push([width,height]);
    }
    for(let i = 0; i< imgs.length; i++){
        const x = imgs[i][0];
        const y = imgs[i][1];
        ctx.drawImage(carrot,x,y);
    }
}
button__play.addEventListener('click',()=>{
    game__start();
});

