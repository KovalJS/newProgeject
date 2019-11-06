//8урок 
'use strict';

let buttonCalculate = document.getElementById('start'),        //Кнопка Расчитать
    buttonCancel = document.getElementById('cancel'),          //Кнопка Сбросить
    battonPlus1 = document.getElementsByTagName('button')[0],  //Кнопка + Дополнительный доход
    battonPlus2 = document.getElementsByTagName('button')[1],  //Кнопка + Обязательные расходы
    depositCheck = document.querySelector('#deposit-check'),   //чекбокс
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), //поля для ввода возможных доходов 
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],  //имеют класс название-value
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], //Накопления за период
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],  //Срок достижения цели в месяцах
    budgetMonthValue = document.querySelector('.budget_month-value'), //Доход за месяц
    periodSelect = document.querySelector('.period-select'),          //range элемент
    periodAmount = document.querySelector('.period-amount'),           //range, значение
    salaryAmount = document.querySelector('.salary-amount'),   //Месячный доход
    incomeTitle = document.querySelectorAll('.income-title'),   //Дополнительный доход,Наименование
    expensesTitle = document.querySelectorAll('.expenses-title'), //Обязательные расходы,Наименование
    expensesItems = document.querySelectorAll('.expenses-items'), //Обязательные расходы
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы
    targetAmount = document.querySelector('.target-amount'), // Цель, сумма
    incomeItem = document.querySelectorAll('.income-items'),  //Дополнительный доход
    dataElement = document.querySelector('.data'), //все поля с левой стороны
    inputElement = dataElement.querySelectorAll('input'), //поля input с левой стороны
    inputTypeText = dataElement.querySelectorAll('input[type=text]'); //поля input[type=text] с левой стороны

const AppData = function() {
    this.budget = 0;           //Месячный доход
    this.budgetDay = 0;        // дневной бюджет,учитывая бюджет на месяц
    this.budgetMonth = 0;      // бюджет на месяц   
    this.expensesMonth = 0;    //сумма всех обязательных расходов
    this.income = {};          //Дополнительный доход
    this.incomeMonth= 0;       //Сумма ,Дополнительный доход
    this.addIncome = [];       // Возможный доход
    this.expenses = {};        //дополнительные расходы //Обязательные расходы
    this.addExpenses = [];     //возможные расходы
    this.deposit = false;
    this.percentDeposit= 0;    //процент депозита
    this.moneyDeposit= 0;    
};

AppData.prototype.start = function() {
        
    this.budget = +salaryAmount.value;  //Месячный доход
        
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    this.blockButton();
};

AppData.prototype.showResult = function() { // Выводит результаты вычислени
    
    budgetMonthValue.value = this.budgetMonth;         //Доход за месяц = // бюджет на месяц  
    budgetDayValue.value = this.budgetDay;             //Дневной бюджет
    expensesMonthValue.value = this.expensesMonth;     //Расход за месяц = //сумма всех обязательных расходов 
    additionalExpensesValue.value = this.addExpenses.join(', ');  //возможные расходы
    additionalIncomeValue.value = this.addIncome.join(', ');   //Возможный доход
    targetMonthValue.value = Math.ceil(this.getTargetMonth()); //Срок достижения цели в месяцах
    incomePeriodValue.value = this.calcSavedMoney(); //Накопления за период
};

AppData.prototype.addExpensesBlock = function() {           //Добавляет новые поля 
          
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, battonPlus2);
    expensesItems = document.querySelectorAll('.expenses-items');  //Обязательные расходы,input

    if (expensesItems.length === 3) {
        battonPlus2.style.display = 'none';
    }  
    
    buttonCancel.addEventListener('click', function() {
        cloneExpensesItem.remove();
        battonPlus2.style.display = 'block';
    });
};

AppData.prototype.addIncomeBlock = function() {                                //Дополнительный доход ,input
    
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, battonPlus1);
    incomeItem = document.querySelectorAll('.income-items');

    if (incomeItem.length === 3) {
        battonPlus1.style.display = 'none';
    }

    buttonCancel.addEventListener('click', function() {
        cloneIncomeItem.remove();
        battonPlus1.style.display = 'block';
    });
};

AppData.prototype.getExpenses = function() {   //Все //Обязательные расходы
    const _this = this;
    expensesItems = document.querySelectorAll('.expenses-items');
    let itemExpenses = [];
    let cashExpenses = [];
    for (let i = 0; i < expensesItems.length; i++) {
        itemExpenses.push(expensesItems[i].querySelector('.expenses-title'));
        cashExpenses.push(expensesItems[i].querySelector('.expenses-amount'));
    }
    
    for (let i = 0; i < itemExpenses.length; i++) { 
        if (itemExpenses[i].value !== '' && cashExpenses[i].value !== '') {
            _this.expenses[itemExpenses[i].value] = cashExpenses[i].value;
        }
    }
};

AppData.prototype.getIncome = function() { //Дополнительный доход
    const _this = this;
    incomeItem = document.querySelectorAll('.income-items');
    let itemIncome = [];
    let cashIncome = [];
    for (let i = 0; i < incomeItem.length; i++) {
        itemIncome.push(incomeItem[i].querySelector('.income-title'));
        cashIncome.push(incomeItem[i].querySelector('.income-amount'));
    }
    
    for (let i = 0; i < itemIncome.length; i++) { 
        if (itemIncome[i].value !== '' && cashIncome[i].value !== '') {
            _this.income[itemIncome[i].value] = cashIncome[i].value;
        }
    }
        
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }     
};

AppData.prototype.getAddExpenses = function() { //Возможные расходы
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function() {  // Возможный доход
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    }); 
};

AppData.prototype.getExpensesMonth = function() {   
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key]; //cумма всех расходов за месяц
    } 
};

AppData.prototype.getBudget = function() {               
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; //Накопления за месяц,бюджет на месяц
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {                   
    return targetAmount.value / this.budgetMonth;     //за какой период будет достигнута цель
};

AppData.prototype.getStatusIncome = function() {                                 //уровень дохода
    if (this.budgetDay > 800) {
        return ('Высокий уровень дохода');
    } else if (this.budgetDay >= 300 && this.budgetDay <= 800) {
        return ('Средний уровень дохода');
    }
    else if (this.budgetDay >= 0 && this.budgetDay < 300) {
        return ('Низкий уровень дохода');
    }
    else if (this.budgetDay < 0 ) {
        return ('Что то пошло не так');
    }
};

AppData.prototype.getInfoDeposit = function() {
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (this.deposit) {
        do {
            this.percentDeposit = +prompt('Какой годовой процент?');
            console.log('getInfoDeposit', this);
        }
        while(isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null || this.percentDeposit === 0);
    
        do {
            this.moneyDeposit = +prompt('Какая сумма заложена?');
        }
        while(isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null || this.moneyDeposit === 0);    
    }
};

AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;  //сколько заработаем за переиод
};

AppData.prototype.blockButton = function() {
    inputTypeText = dataElement.querySelectorAll('input[type=text]');
    inputTypeText.forEach(function(item) {  // Блокирует input  и скрывает кнопку Расчитать
        item.disabled = true;
    }); 

            
    buttonCalculate.style.display = 'none';
    buttonCancel.style.display = 'block';
};

AppData.prototype.reset = function() {

    inputTypeText.forEach(function(item) {
        inputTypeText.forEach(function(item) {
            item.disabled = false;
        });

        buttonCalculate.style.display = 'block';
        buttonCancel.style.display = 'none';

    }); 

    let allInput = document.querySelectorAll('input');
    allInput.forEach(function(item) {
        item.value = item.defaultValue;
    });

    periodAmount.textContent = periodSelect.value;

    for (let member in this) {
        
        if (typeof this[member] !== 'function' && typeof this[member] !== 'object' && typeof this[member] !== 'boolean') {
            this[member] = 0;      
        }
           
        if (member === 'income' || member === 'expenses') {
            this[member] = {};
        }

        if (member === 'addIncome' || member === 'addExpenses') {
            this[member] = [];
        }

    }
};

AppData.prototype.eventListenets  = function() {
    const _this = this;
    buttonCalculate.addEventListener('click', function() {
        if (document.querySelector('.salary-amount').value !== '') {
            _this.start();
        } else {
            alert('Вы не заполнили поле "Месячный доход"!')
        }
    });
    
    buttonCancel.addEventListener('click',function(){
        _this.reset();
    });
     
    battonPlus2.addEventListener('click', _this.addExpensesBlock);
    battonPlus1.addEventListener('click', _this.addIncomeBlock);
    
    periodSelect.addEventListener('input', function(event) {
        periodAmount.textContent = periodSelect.value;
    });
    
    periodSelect.addEventListener('input', function(event) {
        incomePeriodValue.value =  _this.budgetMonth * periodSelect.value;
    });
};


const appData = new AppData();

appData.eventListenets();
console.log(appData);
   

    
    // if (appData.getTargetMonth() > 0){
    //     console.log('Цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
    // } else {
    //     console.log('Цель не будет достигнута');
    // }
   
