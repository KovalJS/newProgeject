//4 урок, основное задание

'use strict';

let money = +prompt('Ваш месячный доход?'), //доход за месяц 
    income = 'такси', //строка с дополнительными доходом
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), //строка с перечислением дополнительных расходов
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 20000, //Какую сумму хотите накопить
    period = 5; 

console.log('addExpenses: ', addExpenses.split(','));

let showTypeof = function(data) {
    console.log(data, typeof data);
};

showTypeof(money);
showTypeof(income);
showTypeof(deposit);

let questionСosts1 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    questionSum1 = +prompt('Во сколько это обойдется?'),
    questionСosts2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    questionSum2 = +prompt('Во сколько это обойдется?');

//cумма всех расходов за месяц
function getExpensesMonth() {
    return questionSum1 + questionSum2;
}   

//Накопления за месяц
let accumulatedMonth;
function getAccumulatedMonth() {
    accumulatedMonth = money - getExpensesMonth();
    return accumulatedMonth;
}

//за какой период будет достигнута цель
function getTargetMonth() {
    return Math.floor(mission / getAccumulatedMonth());
}

if (getAccumulatedMonth() > 0) {
console.log('Накопления за период: ', getAccumulatedMonth() * getTargetMonth() );
}

console.log('Cрок достижения цели в месяцах: ', Math.floor(getTargetMonth()) );

// дневной бюджет,учитывая бюджет на месяц
let budgetDay = Math.floor(getAccumulatedMonth() / 30);


let getStatusIncome = function() {
    if (budgetDay > 800) {
        return ('Высокий уровень дохода');
    } else if (budgetDay > 300 && budgetDay <=800) {
        return ('Средний уровень дохода');
    } else if (budgetDay >= 0 && budgetDay <=300) {
        return ('Низкий уровень дохода');
    } else if (budgetDay < 0) {
        return ('Что то пошло не так');
    }
};

console.log(getStatusIncome());