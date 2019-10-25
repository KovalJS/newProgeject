//4 урок,усложненное задание

function acceptsArgument (data) {
    if (typeof data !== 'string') {
        return 'как аргумент передана не строка';
    }
    let withoutSpaces = data.trim();
    
    if (withoutSpaces.length > 30) {
        return withoutSpaces.substr(0,30) + '...';
    }
    
}

console.log('acceptsArgument(10): ', acceptsArgument('Сегодня в компании выходной а завтра уже рабочий день'));