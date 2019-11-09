window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    //Timer
    const countTimer = (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
              timerMinutes = document.querySelector('#timer-minutes'),
              timerSeconds = document.querySelector('#timer-seconds'),
              timerAction = document.querySelector('.timer-action'),
              timer = document.querySelector('#timer');
        let dateStop = new Date(deadline).getTime(),
            dateNowe = new Date().getTime();

        if (dateStop < dateNowe) {
            timerAction.textContent = 'Акция закончилась!';
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            return; 
        }    

        const getTimeRemaining = () => {
            dateStop = new Date(deadline).getTime();
            dateNowe = new Date().getTime();

            let timeRemaining = (dateStop - dateNowe) / 100,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                return {timeRemaining, hours, minutes, seconds};    
        };    

        const upDateClock = () => {
            const timer = getTimeRemaining();
            timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
            timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
            timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
            
            if (timer.timeRemaining <= 0) {
                clearInterval(idInterval);
            }
        };

        const idInterval = setInterval(upDateClock,100);
    };
    countTimer('11 november 2019');
});