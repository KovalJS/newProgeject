'use strict';

const olElement = document.querySelector('ol'),
  buttonElement = document.querySelector('button'),
  inputElement = document.querySelector('input'),
  main = document.querySelector('main');
let liElement = document.querySelectorAll('li');


const addItem = () => {
  let cloneLiElement = liElement[0].cloneNode();
  if (inputElement.value === '') {
    alert('Вы не ввели задачу');
    return;
  }
  cloneLiElement.textContent = inputElement.value;
  liElement[0].parentNode.appendChild(cloneLiElement);
  inputElement.value = '';
};

  

main.addEventListener('click', (event) => { 
  let target = event.target;
    liElement = document.querySelectorAll('li');

  if (target === buttonElement) {
    addItem();
  }

  liElement.forEach((item) => {
    
    if (target === item) {
      if (!target.style.textDecoration || target.style.textDecoration === 'none') {
      target.style.textDecoration = 'line-through';
      } else {
        target.style.textDecoration = 'none';
      }
    }

    /*// Способ 2
    if (target === item) {
      target.classList.toggle('line');
    }
    */ 
  });  

});


