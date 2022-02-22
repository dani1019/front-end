const field = document.querySelector('.game__field');
const fieldObject = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__time');
const gameScore = document.querySelector('.game__score');
const popRestart = document.querySelector('.pop__restart');
const gameRestart = document.querySelector('.game__restart');
const gameMessage = document.querySelector('.game__message');
const imgSize = 80;
const imgCount = 10;
const GAME_DURATION_SEC = 10;
let GAME_SCORE = 10;
let timer = undefined;

let started = false;
//.game__field'에 img를 추가한다.
//game__field의 범위에서..

function initGame(){
    addItem('carrot',imgCount,'img/carrot.png');
    addItem('bug',imgCount,'img/bug.png');
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

gameBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    }else{
        startGame();
    }
    started = !started;
});

//당근을 클릭하면, 당근이 없어지고 카운트수가 1일 줄어들게함.
//0초가 되면 클릭 못하게 함. 개발예정
function clickImage(){
   const carrotImgs = document.querySelectorAll('.carrot');
   carrotImgs .forEach(carrotImg =>{
        carrotImg.addEventListener('click',()=> {
            carrotImg.style.visibility='hidden';
            --GAME_SCORE;
            gameScore.innerText = GAME_SCORE;
        });
   });
}

function startGame(){
    field.innerHTML= '';
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
    clickImage();
}

function stopGame(){
    stopGameTimer();
    stopBtnHidden();
    popUpShow();
};

function showStopBtn(){
    const icon = document.querySelector('.fa-caret-right');
    icon.classList.remove('fa-caret-right');
    icon.classList.add('fa-stop');

}
function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';

}

function startGameTimer(){
    let remainTime = GAME_DURATION_SEC;
    updateTime(remainTime);
    timer = setInterval(()=>{
        if(remainTime == 0){
            popUpShow();
            clearInterval(timer);
            return;
        }
        updateTime(--remainTime);
    },1000);
};

function stopGameTimer(){
    clearInterval(timer);
}

function stopBtnHidden(){
    gameBtn.style.visibility = 'hidden';
}

function popUpShow(){
    popRestart.style.visibility = 'visible';
    gameMessage.innerHTML= 'REPLAY';
}

function updateTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`;
};



//리플레이 버튼누르면, 시작 버튼이 다시 생기고, 
//시간과 당근 수가 초기화 됨.