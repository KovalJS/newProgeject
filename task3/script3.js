//Задача 3

'use strict';

let sumNumber = function() {
    let number = prompt('Введите любое число'),
        sum = 0;
    while(typeof number == 'number' || number == '' || typeof number == 'string') {
        if (!isNaN(parseFloat(number)) && isFinite(number)){
            sum += +number;
        }
        number = prompt('Введите любое число');    
    }

    if (number == null)
    {
       return sum;
    }
};

alert(sumNumber());