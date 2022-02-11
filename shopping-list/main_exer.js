

//3.리스트에 올라가도록 한다.
//4.쓰레기통 버튼을 누르면 삭제되도록 한다.
//5.텍스트를 입력하지 않으면 그대로 return되도록한다.

const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
const items = document.querySelector('.items');

function onAdd(){
    //1.텍스트 값을 받아온다.
    const text = input.value;
    if( text === ''){
        input.focus();
        return;
    }
    input.value = '';
    input.focus();
    const item = createItem(text);
    items.appendChild(item);
};

addBtn.addEventListener('click', ()=>{
    onAdd();
});

function createItem(text){
//2.새로운 아이템 만듦
const itemRow = document.createElement('li');
itemRow.setAttribute('class','item__row');

const item = document.createElement('div');
item.setAttribute('class','item');

const span = document.createElement('span');
span.setAttribute('class','item__name');
span.innerText = text;

const deleteBtn = document.createElement('button');
deleteBtn.setAttribute('class','item__delete');
deleteBtn.innerHTML= '<i class="fas fa-trash-alt"></i>';
deleteBtn.addEventListener('click',()=>{
    items.removeChild(itemRow);
});

const itemDivider = document.createElement('div');
itemDivider.setAttribute('class','item__divider');

item.appendChild(span);
item.appendChild(deleteBtn);

itemRow.appendChild(item);
itemRow.appendChild(itemDivider);
return itemRow;
};

input.addEventListener('keypress',()=>{
  console.log(input.value);
});