//3 урок, основное задание

'use strict';

let money = +prompt('Ваш месячный доход?'), //доход за месяц 
    income = 'такси', //строка с дополнительными доходом
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), //строка с перечислением дополнительных расходов
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000, //Какую сумму хотите накопить
    period = 5; 

// длина строки с дополнительным доходом    
console.log('income.length: ', income.length);

console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log('addExpenses: ', addExpenses.split(','));

console.log('money: ', typeof money); 
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

let questionСosts1 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    questionSum1 = +prompt('Во сколько это обойдется?'),
    questionСosts2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    questionSum2 = +prompt('Во сколько это обойдется?');

//доход за месяц, учитывая обязательные расходы
let budgetMonth = money - (questionSum1 + questionSum2);
console.log('budgetMonth: ', budgetMonth);

//за сколько месяцев будет накоплена ссумма
console.log(' за сколько месяцев будет достигнута цель: ',Math.ceil(mission / budgetMonth));

// дневной бюджет,учитывая бюджет на месяц
let budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay: ', budgetDay);

//доход
if (budgetDay > 800) {
    console.log('Высокий уровень дохода');
} else if (budgetDay > 300 && budgetDay <= 800) {
    console.log('Средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay <=300 ) {
    console.log('Низкий уровень дохода');
} else if (budgetDay < 0){
    console.log('Что то пошло не так');
}