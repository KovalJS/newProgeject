//5 урок, усложненное задание

'use strict';

let money, //доход за месяц 
    start = function() {
    do{
        money = prompt('Ваш месячный доход?');
    }
    while(isNaN(money) || money === '' || money === null);
   
    };

    start();

let income = 'такси', //строка с дополнительными доходом
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), //строка с перечислением дополнительных расходов
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 20000, //Какую сумму хотите накопить
    period = 5; 



console.log('addExpenses: ', addExpenses.split(','));

let showTypeof = function(data) {
    console.log(data, typeof data);
};

showTypeof(+money);
showTypeof(income);
showTypeof(deposit);

let questionСosts1,
    questionСosts2;    

//cумма всех расходов за месяц
let getExpensesMonth = function() {
    let sum = 0,
        questionSum;

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
           
        sum += +questionSum;
        
    }
    return sum;
}; 

let expensesAmount = getExpensesMonth();
console.log('Сумма расходов: ', expensesAmount);

//Накопления за месяц
let accumulatedMonth;
function getAccumulatedMonth() {
    accumulatedMonth = money - expensesAmount;
    return accumulatedMonth;
}

//за какой период будет достигнута цель
function getTargetMonth() {
    return Math.floor(mission / getAccumulatedMonth());
}
getTargetMonth();

let getTargetMonthCheck = function(data) {
    if (data < 0){
        return 'Цель не будет достигнута';
    } else {
        return 'Цель будет достигнута через ' + data + ' месяцев'; 
    }
}; 
console.log(getTargetMonthCheck(getTargetMonth()));

if (getAccumulatedMonth() > 0) {
console.log('Накопления за период: ', getAccumulatedMonth());
}

// дневной бюджет,учитывая бюджет на месяц
let budgetDay = Math.floor(getAccumulatedMonth() / 30);

let getStatusIncome = function() {
    if (budgetDay > 800) {
        return ('Высокий уровень дохода');
    } else if (budgetDay > 300 ) {
        return ('Средний уровень дохода');
    }
    else if (budgetDay >= 0 ) {
        return ('Низкий уровень дохода');
    }
    else if (budgetDay < 0 ) {
        return ('Что то пошло не так');
    }
};

console.log(getStatusIncome());