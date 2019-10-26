//6 урок, основное задание

'use strict';

let money,                 //доход за месяц
    questionСosts1,        //обязательные ежемесячные расходы
    questionСosts2,
    accumulatedMonth,      //Накопления за месяц
    start = function() {
        do{
            money = prompt('Ваш месячный доход?');
        }
        while(isNaN(money) || money === '' || money === null);
   
    };

start();

let appData = {
    budget : money,
    budgetDay : 0,        // дневной бюджет,учитывая бюджет на месяц
    budgetMonth : 0,
    expensesMonth : 0,    //сумма всех обязательных расходов
    income : {},          //строка с дополнительными доходом
    addIncome : [],
    expenses : {},        //дополнительные расходы
    addExpenses : [],     //возможные расходы
    deposit : false,
    mission : 20000,      //Какую сумму хотите накопить
    period : 5,
    asking : function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через  запятую'); //строка с перечислением дополнительных расходов
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let questionSum;    
        for (let i = 0; i < 2; i++) {
            
            if (i == 0) {
                questionСosts1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
            }
            if (i == 1) {
                questionСosts2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
            }
      
            do {
                questionSum =  prompt('Во сколько это обойдется?');
            } 
            while(isNaN(questionSum) || questionSum === '' || questionSum === null); 
            
            (i == 0) ? appData.expenses[questionСosts1] = questionSum : appData.expenses[questionСosts2] = questionSum;   
        }      
    },
    getExpensesMonth : function() {   
       for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key]; //cумма всех расходов за месяц
       }
    },
    getBudget : function() {               
        accumulatedMonth = appData.budget - appData.expensesMonth; //Накопления за месяц
        appData.budgetDay = Math.floor(accumulatedMonth / 30);
        appData.budgetMonth;
    },
    getTargetMonth : function() {                   
        return Math.floor(appData.mission / accumulatedMonth);     //за какой период будет достигнута цель
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
    } 
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Доход appData.budget ', +appData.budget);

console.log('дополнительные расходы appData.expenses: ', appData.expenses);

let expensesAmount = appData.expensesMonth;
console.log('Сумма расходов: ', expensesAmount);

console.log('Накопления за месяц appData.getBudget(): ', accumulatedMonth);

let getTargetMonthCheck = function(data) {
    if (data < 0){
        return 'Цель не будет достигнута';
    } else {
        return 'Цель будет достигнута через ' + data + ' месяцев'; 
    }
}; 
console.log(getTargetMonthCheck(appData.getTargetMonth()));

//уровень дохода
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let keyName in appData) {
    console.log(appData[keyName]);
    for(var keyName2 in appData[keyName]) {
        if(typeof(appData[keyName][keyName2]) === 'object') {
            console.log(obj[keyName][keyName2]);
        }
    }
}    