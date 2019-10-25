//Задача 1

'use strict';

let number1,
    number2;

let compareNumber = function() {
    do {
        number1 = +prompt('Введите любое число для сравнения?');
    }
    while(isNaN(number1) || number1 == '' || number1 == null);
    do {
        number2 = +prompt('Введите второе число для сравнения?');
    }
    while(isNaN(number2) || number2 == '' || number2 == null);

    if (number1 > number2) {
        return 'Первое число больше второго';
    } else if (number1 < number2) {
        return 'Второе число больше первого';
    } else {
        return 'Числа равны';
    }
    
};

alert(compareNumber());