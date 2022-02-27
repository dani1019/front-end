const field = document.querySelector('.game__field');
const fieldObject = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__time');
const gameScore = document.querySelector('.game__score');
const popRestart = document.querySelector('.pop__restart');
const gameRestart = document.querySelector('.game__restart');
const gameMessage = document.querySelector('.game__message');
const imgSize = 80;
const CARROT_COUNT = 10;
const GAME_DURATION_SEC = 10;
let GAME_SCORE = 10;
let timer = undefined;
let score = 0;

let started = false;
//.game__field'에 img를 추가한다.
//game__field의 범위에서..

function initGame(){
    addItem('carrot',CARROT_COUNT,'img/carrot.png');
    addItem('bug',CARROT_COUNT,'img/bug.png');
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

field.addEventListener('click',(event) => onfieldClick(event));

function randomSpot(min, max){
    return Math.random()*(max-min) + min;
};

gameBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    }else{
        startGame();
    }
});

function startGame(){
    started = true;
    field.innerHTML= '';
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
}

function onfieldClick(event){
    if(started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        target.remove();
        score++;
        updataScoreBoard();
        if(CARROT_COUNT === score){
            finishGame(true);
        }
    }else if(target.matches('.bug')){
        stopGameTimer();
        finishGame(false);  
    }
}

function updataScoreBoard(){
    gameScore.innerText = CARROT_COUNT - score;
}

function finishGame(win){
    started = false;
    stopBtnHidden();
    popUpShow(win ? 'YOU WIN' : 'YOU LOST');
}


function stopGame(){
    started = false;
    stopGameTimer();
    stopBtnHidden();
    popUpShow('RESTART');
};

function showStopBtn(){
    const icon = document.querySelector('.fas');
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
            clearInterval(timer);
            finishGame(CARROT_COUNT==score);
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

function popUpShow(text){
    popRestart.style.visibility = 'visible';
    gameMessage.innerText = text;
}

popRestart.addEventListener('click',() =>{
    hidepopRestart();
});

function hidepopRestart(){
    popRestart.style.visibility='hidden';
    gameTimer.style.visibility = 'hidden';
    gameScore.style.visibility = 'hidden';
    gameBtn.style.visibility='visible';
    const icon = document.querySelector('.fas');
    icon.classList.remove('fa-stop');
    icon.classList.add('fa-caret-right');
    field.innerHTML= '';
    started = false;
}

function updateTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`;
};