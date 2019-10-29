'use strict';

let books = document.querySelector('.books'),
    book = document.querySelectorAll('.book'),
    body = document.querySelector('body'),
    advertising = body.querySelector('.adv'),
    ulBook2 = book[0].querySelector('ul'),
    liBook2 = ulBook2.querySelectorAll('li'),
    ulBook5 = book[5].querySelector('ul'),
    liBook5 = ulBook5.querySelectorAll('li'),
    ulBook6 = book[2].querySelector('ul'),
    liBook6 = ulBook6.querySelectorAll('li'),
    newLiBook6 = document.createElement('li');
  
books.insertBefore(book[1], book[0]);  
books.insertBefore(book[4], book[2]);
books.insertBefore(book[3], book[2]);
books.insertBefore(book[5], book[2]); 

body.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');

book[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

body.removeChild(advertising);

ulBook2.insertBefore(liBook2[6], liBook2[4]);
ulBook2.insertBefore(liBook2[8], liBook2[4]);
ulBook2.insertBefore(liBook2[2], liBook2[10]);

ulBook5.insertBefore(liBook5[9], liBook5[2]);
ulBook5.insertBefore(liBook5[3], liBook5[2]);
ulBook5.insertBefore(liBook5[4], liBook5[2]);
ulBook5.insertBefore(liBook5[5], liBook5[8]);

newLiBook6.textContent = 'Глава 8: За пределами ES6';
ulBook6.insertBefore(newLiBook6, liBook6[9]);





