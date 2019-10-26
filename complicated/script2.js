//5 урок, усложненное задание

let arr = ['10', '100', '20', '200', '30', '300', '40'];

//console.log(+arr[2].substr(0,1));
arr.forEach(function(item) {
    if (+item.substr(0,1) === 2 || +item.substr(0,1) === 4){
        console.log(+item);
    }
});

for (var i = 2; i <=100; i++){
    
    for(var j = 2; j <= i; j++){
        
        if (i % j == 0) break;
    }
    if(j == i) console.log(i + ' Делители этого числа: 1 и ' + i);
}