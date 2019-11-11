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

            let timeRemaining = (dateStop - dateNowe) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                return {timeRemaining, hours, minutes, seconds};    
        };    

        const upDateClock = () => {
            const timer = getTimeRemaining();

            if (timer.timeRemaining <= 0) {
                clearInterval(idInterval);
                return;
            }
            
            timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
            timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
            timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
        };

        const idInterval = setInterval(upDateClock, 1000);
    };
    countTimer('18 november 2019');

    //Menu

    const toggleMenu = () => {
        const btmMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = menu.querySelectorAll('ul>li'),
            widthWindow = document.documentElement.clientWidth;

        const handlerMenu = () => {
            if (widthWindow <= 768) {
                if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                    menu.style.transform = `translate(0)`;
                } else {
                    menu.style.transform = `translate(-100%)`;
                }
            } else {
                menu.classList.toggle('active-menu');
            } 
        };

        btmMenu.addEventListener('click', handlerMenu);
        
        closeBtn.addEventListener('click', handlerMenu);

        menuItem.forEach((elem) => elem.addEventListener('click', handlerMenu));     
    };

    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content'),
            widthWindow = document.documentElement.clientWidth;
        let counts = 0;

        const animatePopUp = () => {
            const idAnimate = setTimeout(animatePopUp);
            
            if (counts < 120) {
                popupContent.style.top = counts + 'px';
            } else {
                clearInterval(idAnimate);
            }
            counts++; 
        };   

        popupBtn.forEach((item) => {
            item.addEventListener('click', () => {
                const idAnimate = setTimeout(animatePopUp);

                if (widthWindow < 768) {
                clearInterval(idAnimate);
                }
                popup.style.display = 'block';
            });
        });   
    
        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
            counts = 0;
        });

    }; 
    togglePopUp();
});