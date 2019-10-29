'use strict';

let buttonCalculate = document.getElementById('start'),        //Кнопка Расчитать
    battonPlus1 = document.getElementsByTagName('button')[0],  //Кнопка +
    battonPlus2 = document.getElementsByTagName('button')[1],  //Кнопка +
    depositCheck = document.querySelector('#deposit-check'),   //чекбокс
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), //поля для ввода возможных доходов 
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],  //имеют класс название-value
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    budgetMonthValue = document.querySelector('.budget_month-value'), //Доход за месяц
    periodSelect = document.querySelector('.period-select'),                 //range
    salaryAmount = document.querySelector('.salary-amount'),   //Месячный доход
    incomeTitle = document.querySelectorAll('.income-title'),   //Дополнительный доход,Наименование
    incomeAmount = document.querySelector('.income-amount'), //Дополнительный доход,Сумма
    expensesTitle = document.querySelectorAll('.expenses-title'), //Обязательные расходы,Наименование
    expensesAmount = document.querySelector('.expenses-amount'), //Обязательные расходы,Сумма
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), // Возможные расходы
    targetAmount = document.querySelector('.target-amount'); // Цель, сумма



