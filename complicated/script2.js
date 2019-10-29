//7 урок,усложненное задание
'use strict';
let date = new Date(),
    hour = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

let dateYear = function() {
    if (hour < 10) hour = '0' + hour; 
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;   
};
dateYear();

let div = document.createElement('div');    
div.textContent = hour + ':' + minutes + ':' + seconds + ' ' + day + ':' + month + ':' + year;
document.body.appendChild(div);
