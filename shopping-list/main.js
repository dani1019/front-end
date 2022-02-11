const form = document.querySelector('.form');
const items = document.querySelector('.items');
const addBtn = document.querySelector('.footer__button');
const input = document.querySelector('.footer__input');

function onAdd(){
    const text = input.value;
    if( text === ''){
        input.focus();
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    input.value = '';
    input.focus();
};

addBtn.addEventListener('click', () =>{
    onAdd();
});
let id = 0;
function createItem(text){
const itemRow = document.createElement('li');
itemRow.setAttribute('class','item__row');
itemRow.setAttribute('data-id',id);
itemRow.innerHTML=
` <div class="item">
    <span class="item__name">${text}</span>
        <button class="item__delete">
            <i class="fas fa-trash-alt" data-id=${id}></i>
        </button>
    </div>
    <div class="item__divider"></div>
`
id++;
console.log(id);
return itemRow;
}
items.addEventListener('click', event =>{
    const id = event.target.dataset.id;
    if(id){
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
        toBeDeleted.remove(id);
    }
});
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    onAdd();
});