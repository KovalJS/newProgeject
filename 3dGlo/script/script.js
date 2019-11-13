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
            widthWindow = document.documentElement.clientWidth,
            tagBody = document.querySelector('body');

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

       
        btmMenu.addEventListener('click', () => {
            handlerMenu();
        });

        menu.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('close-btn')) {
                handlerMenu(); 
            }

            target = target.parentNode;
            if (target.tagName === 'LI') {
                handlerMenu();
            }
                                
        });  
    };

    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content'),
            widthWindow = document.documentElement.clientWidth;
        let counts = 0;

        const animatePopUp = () => {
            const idAnimate = setTimeout(animatePopUp);
            
            if (counts < 100) {
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

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                counts = 0;
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                    counts = 0;
                }
            }
        });
    }; 

    togglePopUp();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContant = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none'); 
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };    
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target.classList.contains('service-header-tab')) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContant(i);
                    }
                });
            }   
        });    
    };

    tabs();

    //слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            portfolioDots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');
        
        const setDotElement = () => {  
            let dotElement = document.createElement('li');
                dotElement.classList.add('dot');
            
            for (let i = 0; i < slide.length; i++) {
                let cloneDotElement = dotElement.cloneNode(true);
                portfolioDots.appendChild(cloneDotElement);
            
                if (i === 0) {
                cloneDotElement.classList.add('dot-active'); 
                }
            }
        };

        setDotElement();
        
        let currentSlide = 0,
            interval,
            dot = document.querySelectorAll('.dot');
            
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            } 

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
                
            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                 dot.forEach((elem, index) => {
                    if(elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length -1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);       
    };

    slider();
});