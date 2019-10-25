//Задача 2

'use strict';

let year1,
    year2;

let leapYear = function() {
    do {
        year1 = +prompt('Введите начальный год?');
    }
    while(isNaN(year1) || year1 == '' || year1 == null);
    do {
        year2 = +prompt('Введите конечный год?');
    }
    while(isNaN(year2) || year2 == '' || year2 == null);

    if (year1 <= year2) {
        while (year1 <= year2) {
            if (year1 % 4 == 0) {
                if (year1 % 100 == 0) {
                    if(year1 % 400 == 0) {
                        console.log(year1); 
                    }          
                } else {
                    console.log(year1);
                }
            }
            year1++;
        }
    } else if (year1 > year2) {
        while (year2 <= year1) {
            if (year2 % 4 == 0) {
                if (year2 % 100 == 0) {
                    if(year2 % 400 == 0) {
                        console.log(year2); 
                    }          
                } else {
                    console.log(year2);
                }
            }
            year2++;
        }
    }   
};

leapYear();