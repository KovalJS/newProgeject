//Практика подготовка

'use strict';

let money,                 //доход за месяц
    start = function() {
        do{
            money = +prompt('Ваш месячный доход?');
        }
        while(isNaN(money) || money === '' || money === null || money === 0);
   
    };

start();

let appData = {
    budget : money,
    budgetDay : 0,        // дневной бюджет,учитывая бюджет на месяц
    budgetMonth : 0,      // бюджет на месяц   
    expensesMonth : 0,    //сумма всех обязательных расходов
    income : {},          //строка с дополнительными доходом
    addIncome : [],
    expenses : {},        //дополнительные расходы
    addExpenses : [],     //возможные расходы
    deposit : false,
    percentDeposit: 0,    //процент депозита
    moneyDeposit: 0,      //сколько человек заложил денег  
    mission : 20000,      //Какую сумму хотите накопить
    period : 5,
    asking : function(){

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome,
                cashIncome;
            do {
                itemIncome = prompt('Какой у Вас дополнительный заработок?');
            } 
            while (itemIncome === '' || itemIncome === null || !isNaN(itemIncome));

            do {
                cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?');
            } 
            while(isNaN(cashIncome) || cashIncome === '' || cashIncome === null || cashIncome === 0);   

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через  запятую'); //строка с перечислением дополнительных расходов
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            
        for (let i = 0; i < 2; i++) {
            let questionСosts,
                questionSum;

            do {
                questionСosts = prompt('Какие обязательные ежемесячные расходы у вас есть?');
            }    
            while (questionСosts === '' || questionСosts === null || !isNaN(parseFloat(questionСosts)) && isFinite(questionСosts));
                
            do {
                questionSum =  +prompt('Во сколько это обойдется?');
            } 
            while(isNaN(questionSum) || questionSum === '' || questionSum === null || questionSum === 0); 
            
            appData.expenses[questionСosts] = questionSum;    
        }      
    },
    getExpensesMonth : function() {   
       for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key]; //cумма всех расходов за месяц
       }
    },
    getBudget : function() {               
        appData.budgetMonth = appData.budget - appData.expensesMonth; //Накопления за месяц,бюджет на месяц
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth : function() {                   
        return Math.floor(appData.mission / appData.budgetMonth);     //за какой период будет достигнута цель
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
        return appData.budgetMonth * appData.period;
    }//сколько заработаем за переиод    
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

appData.getInfoDeposit();

console.log('Доход appData.budget ', +appData.budget);

console.log('Сумма расходов за месяц: ', appData.expensesMonth);

console.log('Накопления за месяц,бюджет на месяц appData.getBudget(): ', appData.budgetMonth);

if (appData.getTargetMonth() > 0){
    console.log('Цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

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

appData.addExpenses.forEach(function(item, i, arr) {
    arr[i] = item[0].toUpperCase() + item.slice(1).toLowerCase(); 
});
console.log(appData.addExpenses.join(', '));