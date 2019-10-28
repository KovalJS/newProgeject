//6 урок, дополнительное задание

'use strict';

let week = ['воскресение', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    now = new Date(),
    weekDay = now.getDay();

week.forEach(function(item,i) {

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
