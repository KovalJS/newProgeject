//6 урок, дополнительное задание

'use strict';

let week = ['воскресение', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

week.forEach(function(item,i) {
    let now = new Date(),
        weekDay = now.getDay();

    if (item === 'суббота' || item === 'воскресение') {
        item = item.italics(); 
    }     

    if (weekDay === i) {
        item = item.bold();
    }    
  
    let div = document.createElement('div');
    div.innerHTML = item;
    document.body.appendChild(div);

});
