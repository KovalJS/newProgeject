'use strict';

const getTimesOfDay = document.querySelector('#timesOfDay'),
      getDaysOfWeek = document.querySelector('#daysOfWeek'),
      getTime = document.querySelector('#time'),
      getDaysLeft = document.querySelector('#daysLeft');

let week = ['воскресение', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    date = new Date(),
    weekDay = date.getDay(),
    hoursDay = date.getHours(),
    dataStop = new Date(2019, 12, 1).getTime(),
    dateMilliseconds = new Date().getTime(),
    timeRemaining = Math.floor((dataStop - dateMilliseconds) / 1000 / 60 / 60 / 24);

if (hoursDay >= 6 && hoursDay <= 12) {
    getTimesOfDay.textContent = 'утро';
} else if (hoursDay > 12 && hoursDay <= 18) {
    getTimesOfDay.textContent = 'день';
} else if (hoursDay > 18 && hoursDay <= 24) {
    getTimesOfDay.textContent = 'вечер';
} else if (hoursDay > 0 && hoursDay < 6) {
    getTimesOfDay.textContent = 'ночи';
}

week.forEach((item,i) => {    
    if (weekDay === i) {
        getDaysOfWeek.textContent = item;     
    }    
}); 

getTime.textContent = date.toLocaleTimeString('en-US');

getDaysLeft.textContent = timeRemaining;                
                
    
          