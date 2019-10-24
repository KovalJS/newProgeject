let num = 266219;

console.log(num.toString()
    .split('')
    .reduce((accumulator, currentValue) => accumulator * currentValue));

console.log( (num.toString()
    .split('')
    .reduce((accumulator, currentValue) => accumulator * currentValue) ** 3)
    .toString()
    .substr(0,2) );  