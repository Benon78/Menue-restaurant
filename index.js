import {menuArray} from '/data.js'

const itemsEl = document.getElementById('items-container');
const itemsAdded = document.querySelector('#added-menus')
const paymentForm = document.querySelector('#payment-form');
const menuAddItemsArray = []

// Add event listener for adding items
document.addEventListener('click',function(e) {
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add); 
    }
    if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)

    }
    if(e.target.id === 'complete-order-btn'){
       openPaymentModal()
    }
    if(e.target.id === 'payment-btn'){
        e.preventDefault()
        closePaymentModal()
    }

})
function handleAddClick(menuId) {
    const menueAddedObj = menuArray.filter(function(item){

        return item.id === parseInt(menuId);
    })[0]
    if(!menuAddItemsArray.includes(menueAddedObj)){
        menuAddItemsArray.push(menueAddedObj)
        
    }else{
        menueAddedObj.price += menueAddedObj.price ;
    }
    
    renderMenuItems()
}

function handleRemoveClick(menuId) {
    const index = menuAddItemsArray.findIndex(function(item){
        return item.id === parseInt(menuId);
    })
    if(index > -1){
        menuAddItemsArray.splice(index, 1)
    }
    renderMenuItems()
}

// Open payment modal
function openPaymentModal(){
    document.querySelector('.payment-modal').style.display = 'block';
}

// Close payment modal
function closePaymentModal(){
    const inputNameValue = document.querySelector('#full-name').value
    const inputNumberValue = document.querySelector('#card-number').value
    const inputCvvValue = document.querySelector('#card-cvv').value
    const regex = /^[A-Za-z]*\s{1}[A-Za-z]*$/;
    const patternOne =/[0-9]/
    const patternTwo = /[0-9]{3}/
    if  (inputNameValue.length !== 0 
            && inputNameValue.match(regex)
            && inputNumberValue.length !== 0 
            && inputNumberValue.match(patternOne) 
            && inputCvvValue.length !== 0 
            && inputCvvValue.match(patternTwo)){
    document.querySelector('.payment-modal').style.display = 'none';
    document.querySelector('.checkout-container').style.display = 'none'
    document.querySelector('.thanks-container').style.display = 'block'
    updateUser()
    document.querySelectorAll('input[type="text"]').value = ''
    setTimeout(function() {document.querySelector('.thanks-container').style.display = 'none'},3000)
    }
    else{
        alert('Please enter your credit card details')
        document.querySelectorAll('input[type="text"]').value = ''
    }
}

function updateUser(){
    const paymentFormDta = new FormData(paymentForm);
    const userName = paymentFormDta.get('full-name')
    let par = document.createElement('p');
    par.textContent = `Thank you, ${userName}! Your order is on its way!`;
    document.querySelector('.thanks-container').appendChild(par);
}

// Render menu items added

function renderMenuItems(){
 menuAddItemsArray.length === 0? document.querySelector('.checkout-container').style.display = 'none' 
 :  document.querySelector('.checkout-container').style.display = 'block';

    const totalPrice = menuAddItemsArray.reduce((total, item) => total + item.price, 0);
    itemsAdded.innerHTML = menuAddItemsArray.map(function(item){
        return  `
                 <div class="menu">
                    <p>${item.name}</p>
                    <button id="remove-item-btn" data-remove ="${item.id}">remove</button>
                    <span>$${item.price}</span>
                </div>`
        }).join('');
    document.querySelector('#total-price').textContent = `$${totalPrice}`
    
}
   


itemsEl.innerHTML = menuArray.map(function(menuArrayItem) {

const ingredients = menuArrayItem.ingredients.map(function(ingredient) {
    return `<span>${ingredient}</span>`;
}).join(', ');

return `

             <div class="item" id="${menuArrayItem.id}">
                 <div class="item-header">
                     <img src="${menuArrayItem.emoji}">
                 </div>
                 <div class="item-ingredients">
                  <h2>${menuArrayItem.name}</h2>
                     <p>${ingredients}</p>
                    <span>$${menuArrayItem.price}</span>
                 </div>
                 <div class="add-item">
                    <i class="fa-solid fa-plus" data-add="${menuArrayItem.id}"></i>
                 </div>
             </div>
`

}).join('');


// let isDarkTheme = false;  

// function toggleTheme() {  
//     const body = document.querySelector('main');  
//     if (isDarkTheme) {  
//         body.classList.remove('dark-theme');  
//         body.classList.add('light-theme');  
//     } else {  
//         body.classList.remove('light-theme');  
//         body.classList.add('dark-theme');  
//     }  
//     isDarkTheme = !isDarkTheme;  
// }  

// // Event listener for theme toggle button  
// document.getElementById('theme-toggle').addEventListener('click', toggleTheme);






















