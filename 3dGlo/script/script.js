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
    countTimer('18 januaary 2019');

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

    const mouseHover = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');
        commandPhoto.forEach((item, i) => {
            let srcAttribute = item.src;

            item.addEventListener('mouseenter', (event) => {
                event.target.src = event.target.dataset.img;
            });

            item.addEventListener('mouseleave', (event) => {
                event.target.src = srcAttribute; 
            });
        });
    };

    mouseHover();

    const enterNumbers = () => {
        let numberInput = document.querySelectorAll('input[type="number"]'),
            calcBlock = document.querySelector('.calc-block');

        numberInput.forEach((item) => {
            item.setAttribute('type', 'text');
            item.removeAttribute('min');
            item.removeAttribute('step');

            item.addEventListener('input', (event) => {
                event.target.value = event.target.value.replace(/\D/g, '');
            });
        });
            
    };

    enterNumbers();

    //калькулятор 
    
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            } else {
                total = 0;
            }

            totalValue.textContent = total;
        };   

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
                
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

    };

    calc(100);

    //send-ajax-form

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
        
        document.querySelectorAll('form').forEach((item) => {
            const patternPhone = /^\+?\d+$/;

            for (let elem of item.elements) {
                let elemId = elem.id.slice(6);
                elem.addEventListener('input', () => {
                    if (elemId === 'name' || elemId === 'message') {
                        elem.value = elem.value.replace(/[^а-яё\s]/ig, '');
                    }
                });  
            } 

            const showError = (elem) => { 
                elem.classList.add('error');
                if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
                    return;
                }
                const errorDiv = document.createElement('div');
                errorDiv.textContent = 'Ошибка в этом поле';
                errorDiv.classList.add('validator-error');
                
                elem.insertAdjacentElement('afterend', errorDiv);
            };
        
            const showSuccess = (elem) => { 
                elem.classList.remove('error');
                
                if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
                    elem.nextElementSibling.remove();
                }
            };
        
            const applyStyle = () => {
                const style = document.createElement('style');
                document.head.appendChild(style);
                style.textContent = `
                    body input.error ,
                    .connect .footer-form input.error{
                        border: 2px solid red;
                    }
        
                    .validator-error {
                        font-size: 16px;
                        font-family: sans-serif;
                        color: red;  
                    }
        
                    #form1 .validator-error{
                        transform: translateY(-3rem);
                    }
                `;
            };
            applyStyle(); 

            const valid = (event) => {
                for (let elem of item.elements) {
                    let elemId = elem.id.slice(6);
                        if (elemId === 'phone' && !patternPhone.test(elem.value)) {
                            event.preventDefault();
                            showError(elem);

                        } else if (elemId === 'phone' && patternPhone.test(elem.value)) {
                            showSuccess(elem);
                            sendingForm(item);
                        }
                }
            };
            
            item.addEventListener('click', (event) => {
               
                if (event.target.tagName === 'BUTTON'){
                valid(event);
                }
            });
            
        }); 
       
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem';

        const sendingForm = (form) => {
            form.addEventListener('submit', (event) => {
            
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(form);
                let body = {};
                
                formData.forEach((val, key) => {
                    body[key] = val;
                });
               
                postData(body,
                    () => {
                    statusMessage.textContent = successMessage;
                    
                    [...form.elements].forEach((item) => {
                        item.value = '';
                    });
                    }, 
                    (error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

            });
        };

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    outputData();
                    
                } else {
                    errorData(request.status);            
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };
    };

    sendForm();
       
});