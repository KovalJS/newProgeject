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

        appData.budget = +salaryAmount.value;  //Месячный доход
            
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function() { // Выводит результаты вычислени

        budgetMonthValue.value = appData.budgetMonth;         //Доход за месяц = // бюджет на месяц  
        budgetDayValue.value = appData.budgetDay;             //Дневной бюджет
        expensesMonthValue.value = appData.expensesMonth;     //Расход за месяц = //сумма всех обязательных расходов 
        additionalExpensesValue.value = appData.addExpenses.join(', ');  //возможные расходы
        additionalIncomeValue.value = appData.addIncome.join(', ');   //Возможный доход
        targetMonthValue.value = Math.ceil(appData.getTargetMonth()); //Срок достижения цели в месяцах
        incomePeriodValue.value = appData.calcSavedMoney(); //Накопления за период
    },
    addExpensesBlock : function() {           //Добавляет новые поля 
            
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, battonPlus2);
        expensesItems = document.querySelectorAll('.expenses-items');  //Обязательные расходы

        if (expensesItems.length === 3) {
            battonPlus2.style.display = 'none';
        }
            
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, battonPlus1);
        incomeItem = document.querySelectorAll('.income-items');

        if (incomeItem.length === 3) {
            battonPlus1.style.display = 'none';
        }
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

            for (let key in appData.income) {
                appData.incomeMonth += +appData.income[key];
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
        for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key]; //cумма всех расходов за месяц
        }
    },
    getBudget : function() {               
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth; //Накопления за месяц,бюджет на месяц
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {                   
        return targetAmount.value / appData.budgetMonth;     //за какой период будет достигнута цель
    },
    getStatusIncome : function() {                                 //уровень дохода
        if (appData.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (appData.budgetDay >= 300 && appData.budgetDay <= 800) {
            return ('Средний уровень дохода');
        }
        else if (appData.budgetDay >= 0 && appData.budgetDay < 300) {
            return ('Низкий уровень дохода');
        }
        else if (appData.budgetDay < 0 ) {
            return ('Что то пошло не так');
        }
    },
    getInfoDeposit : function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
            do {
                appData.percentDeposit = +prompt('Какой годовой процент?');
            }
            while(isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null || appData.percentDeposit === 0);
    
            do {
                appData.moneyDeposit = +prompt('Какая сумма заложена?');
            }
            while(isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null || appData.moneyDeposit === 0);    
        }
    }, 
    calcSavedMoney : function() {
        return appData.budgetMonth * periodSelect.value;  //сколько заработаем за переиод
        }    
    };

    salaryAmount.addEventListener('input', function() {
        if (salaryAmount.value !== '') {
            buttonCalculate.addEventListener('click', appData.start);

            buttonCalculate.addEventListener('click', function() {
                
                
                inputTypeText.forEach(function(item) {
                    item.setAttribute("disabled", "disabled");
                }); 
                
                buttonCalculate.style.display = 'none';
                buttonCancel.style.display = 'block';
            });
        }
    });
    
    battonPlus2.addEventListener('click', appData.addExpensesBlock);
    battonPlus1.addEventListener('click', appData.addIncomeBlock);

    periodSelect.addEventListener('change', function(event) {
        periodAmount.textContent = periodSelect.value;
    });

    periodSelect.addEventListener('change', function(event) {
        incomePeriodValue.value =  appData.budgetMonth * periodSelect.value;
    });
    
    // if (appData.getTargetMonth() > 0){
    //     console.log('Цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
    // } else {
    //     console.log('Цель не будет достигнута');
    // }
    
    // console.log('Наша программа включает в себя данные:');
    // for (let keyName in appData) {
    //     if(typeof(appData[keyName]) === 'object') {
    //         for(let keyName2 in appData[keyName]) {          
    //             console.log(keyName2 + ':' + appData[keyName][keyName2]);
    //         }
    //     }
    
    //     if(typeof(appData[keyName]) !== 'object') {
    //         console.log(keyName + ':' + appData[keyName]); 
    //     }
    // } 
      


