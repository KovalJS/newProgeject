//Задача 4

'use strict';
   
let checkNumber = function() {
    let randomNumber = Math.floor(Math.random() * Math.floor(100));
    let userNumber;

    userNumber = prompt('Угадай число');

    while( isNaN(userNumber) || userNumber === '') {
        userNumber = prompt('Введи число!');
    }

    while (userNumber < randomNumber) {
        userNumber = prompt('Больше!');
        
        while( isNaN(userNumber) || userNumber === '') {
            userNumber = prompt('Введи число!');
        }
    }

    while (userNumber > randomNumber) {
        userNumber = prompt('Меньше!');
        
        while( isNaN(userNumber) || userNumber === '') {
            userNumber = prompt('Введи число!');
        }
    }

    if (userNumber == randomNumber) {
        userNumber = prompt('Поздравляю вы угадали!!! Хотите сыграть еще?');

        if (userNumber == '' || typeof userNumber == 'string') {
            checkNumber();  
        }
    }
};

checkNumber();