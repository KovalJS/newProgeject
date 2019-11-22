document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = (urlCars) => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', urlCars);
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                
                if (request.readyState === 4 && request.status === 200) {
                    let data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                    reject();
                }
            });
        });
    }; 

    const dataCar = (data) => {
        console.log(data);
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        });
    };
     
    const urlCars = './cars.json';
    select.addEventListener('change', () => {
        getData(urlCars)
        .then(dataCar)
        .catch(() => {
            output.innerHTML = 'Произошла ошибка';
        });
    });

});