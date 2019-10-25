//3 урок, усложненное задание

let lang = 'ru',
    namePerson = 'Максим';

if (lang === 'ru'){
    console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресение');
} else if (lang === 'en'){
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
}

switch (lang) {
    case 'ru':
        console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресение');
        break;
    case 'en':
        console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
        break;    
}

let arr = {
	'ru':['понедельник', 'вторник', 'среда','четверг', 'пятница', 'суббота', 'воскресение'],
	'en':['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturdayt', 'Sunday'],
};
console.log(arr[lang]);

//let result = namePerson === 'Артем' ? 'директор' : 'студент'
console.log(namePerson === 'Артем' ? 'директор' : namePerson === 'Максим' ? 'преподаватель' : 'студент');
//console.log(namePerson === 'Максим' ? 'преподаватель' : 'студент');