let money = 20000, 
    income = 'такси',
    addExpenses = 'бензин, ремонт, мойка', //Дополнительные расходы
    deposit = true,
    mission = 1000, //Какую сумму хотите накопить
    period = 5,
    budgetDay = money / 30;

console.log('Доход за месяц: ',typeof money);
console.log('Дополнительный доход: ',typeof income);
console.log('Депозит: ',typeof deposit);

console.log('Длина строки income: ',income.length);

console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

console.log('Дневной бюджет: ',budgetDay);
console.log(money % 30);
