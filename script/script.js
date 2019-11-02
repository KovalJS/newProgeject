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


let appData = {
    budget : 0,           //Месячный доход
    budgetDay : 0,        // дневной бюджет,учитывая бюджет на месяц
     budgetMonth : 0,      // бюджет на месяц   
    expensesMonth : 0,    //сумма всех обязательных расходов
    income : {},          //Дополнительный доход
    incomeMonth: 0,       //Сумма ,Дополнительный доход
    addIncome : [],       // Возможный доход
    expenses : {},        //дополнительные расходы //Обязательные расходы
    addExpenses : [],     //возможные расходы
    deposit : false,
    percentDeposit: 0,    //процент депозита
    moneyDeposit: 0,      //сколько человек заложил денег  
    start : function() {
        
        this.budget = +salaryAmount.value;  //Месячный доход
            
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        this.blockButton();
},
showResult: function() { // Выводит результаты вычислени
    
    budgetMonthValue.value = this.budgetMonth;         //Доход за месяц = // бюджет на месяц  
    budgetDayValue.value = this.budgetDay;             //Дневной бюджет
    expensesMonthValue.value = this.expensesMonth;     //Расход за месяц = //сумма всех обязательных расходов 
    additionalExpensesValue.value = this.addExpenses.join(', ');  //возможные расходы
    additionalIncomeValue.value = this.addIncome.join(', ');   //Возможный доход
    targetMonthValue.value = Math.ceil(this.getTargetMonth()); //Срок достижения цели в месяцах
    incomePeriodValue.value = this.calcSavedMoney(); //Накопления за период
},
addExpensesBlock : function() {           //Добавляет новые поля 
          
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
},
addIncomeBlock: function() {                                //Дополнительный доход ,input
    
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
},
getExpenses: function() {   //Все //Обязательные расходы
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;   
        let cashExpenses = item.querySelector('.expenses-amount').value;
       
        if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
        }
    });
    
},
getIncome: function() { //Дополнительный доход
    incomeItem.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        
        if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
        }
    });
    
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }     
},
getAddExpenses: function() { //Возможные расходы
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            appData.addExpenses.push(item);
        }
    });
},
getAddIncome: function() {  // Возможный доход
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            appData.addIncome.push(itemValue);
        }
    }); 
},
getExpensesMonth : function() {   
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key]; //cумма всех расходов за месяц
    } 
},
getBudget : function() {               
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; //Накопления за месяц,бюджет на месяц
    this.budgetDay = Math.floor(this.budgetMonth / 30);
},
getTargetMonth: function() {                   
    return targetAmount.value / this.budgetMonth;     //за какой период будет достигнута цель
},
getStatusIncome : function() {                                 //уровень дохода
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
},
getInfoDeposit : function() {
    this.deposit = confirm('Есть ли у вас депозит в банке?');
    if (this.deposit) {
        do {
            this.percentDeposit = +prompt('Какой годовой процент?');
            console.log('getInfoDeposit', this);
        }
        while(isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null || appData.percentDeposit === 0);
    
        do {
            this.moneyDeposit = +prompt('Какая сумма заложена?');
        }
        while(isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null || appData.moneyDeposit === 0);    
    }
}, 
calcSavedMoney : function() {
    return this.budgetMonth * periodSelect.value;  //сколько заработаем за переиод
},
blockButton: function() {
    inputTypeText.forEach(function(item) {  // Блокирует input  и скрывает кнопку Расчитать
        item.disabled = true;
    }); 
            
    buttonCalculate.style.display = 'none';
    buttonCancel.style.display = 'block';
},
reset: function() {
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

},   
};

    
buttonCalculate.addEventListener('click', function() {
    if (document.querySelector('.salary-amount').value !== '') {
        appData.start();
    } else {
        alert('Вы не заполнили поле "Месячный доход"!')
    }

});


buttonCancel.addEventListener('click',function(){
    appData.reset();
});
 
battonPlus2.addEventListener('click', appData.addExpensesBlock);
battonPlus1.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function(event) {
    periodAmount.textContent = periodSelect.value;
});

periodSelect.addEventListener('input', function(event) {
    incomePeriodValue.value =  appData.budgetMonth * periodSelect.value;
});
    
    // if (appData.getTargetMonth() > 0){
    //     console.log('Цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
    // } else {
    //     console.log('Цель не будет достигнута');
    // }
   
