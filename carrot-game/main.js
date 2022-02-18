const field = document.querySelector('.game__field');
const fieldObject = field.getBoundingClientRect();
const imgSize = 80;

//.game__field'에 img를 추가한다.
//game__field의 범위에서..

function initGame(){
    addItem('carrot',10,'img/carrot.png');
    addItem('bug',10,'img/bug.png');
}

function addItem(classPath,count,imgPath){
   const x1 = 0;
   const y1 = 0;
   const x2 = fieldObject.width - imgSize;
   const y2 = fieldObject.height - imgSize;
   
   for(let i=0; i< count; i++){
    const img = document.createElement('img');
    img.setAttribute('class', classPath);
    img.setAttribute('src', imgPath);
    img.style.position = 'absolute';
    field.appendChild(img);
    const x = randomSpot(x1, x2);
    const y = randomSpot(y1, y2);
    img.style.left=`${x}px`;
    img.style.top=`${y}px`;
    field.appendChild(img);
   }
};

function randomSpot(min, max){
    return Math.random()*(max-min) + min;
};

initGame();