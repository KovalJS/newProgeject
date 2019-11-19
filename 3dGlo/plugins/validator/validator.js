class Validator{
    constructor ({selector, pattern = {}, method}){
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
            item.type !== 'button';
        });
        //колекция с ошибками
        this.error = new Set();
    }

    init(){
        
        this.elementsForm.forEach(elem => {
            elem.required = false;
        });
        this.applyStyle();
        this.setPattern();
        //при клике по элементу вызывает функцию проверки после ввода и потери фокуса
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
        //блоктрует отправку формы если есть ошибки
        this.form.addEventListener('submit', e => {
            
            if (this.error.size ||
                 !this.elementsForm.forEach(elem => this.chekIt({target: elem}))) {
                e.preventDefault();
            }
        });

    }

    isValid(elem){
        const validatorMethod = {
            notEmpty(elem){
                if(elem.value.trim() === ''){
                    return false;
                }
                return true;
            },
           
            pattern(elem, pattern){
                return pattern.test(elem.value);
            }
        };
       
        if (this.method) {
            //методы которые передает пользователь
            const method = this.method[elem.id.slice(6)];
            
            if (method) {
                
                return method.every( item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей и методы проверки этих полей');
        }
        
        
        return true;
    }

    chekIt(event){ //проверяет на валидность и добавляет класс
        const target = event.target;
       
        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
           
        }
    }

    showError(elem){ //валидация не прошла
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        //Добавляем после элемента
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem){ //валидация прошла проверку
        
        elem.classList.remove('error');
        elem.classList.add('success');
        // Проверяем есть ли у элемента справа класс
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle(){ //Наши стили
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.textContent = `
            body input.success,
            .connect .footer-form input.success{
                border: 2px solid green
            }

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
    }

    setPattern(){
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }

        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
        

        if (!this.pattern.name) {
            this.pattern.name = /^[а-яА-ЯёЁ]+$/;
        }

        if (!this.pattern.message) {
            this.pattern.message = /^[а-яА-ЯёЁ]+$/;
        }
    }
}