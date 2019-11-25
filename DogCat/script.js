const buttonCat = document.querySelector('.batton-cat'),
    buttonDog = document.querySelector('.button-dog'),
    cat = document.querySelector('.cat'),
    dog = document.querySelector('.dog');
    
buttonCat.addEventListener('click', () => {
    fetch('https://aws.random.cat/meow')
        .then((response) => {
           if (response.status !== 200) {
              throw new Error('status not 200'); 
           } 
           
           return response.json();
           
        })
        .then((data) => {
            cat.style.cssText = `background: url('${data.file}') center no-repeat;
            background-size: cover;`;
        })
        .catch((error) => console.log(error));
});     

buttonDog.addEventListener('click', () => {
    fetch('https://random.dog/woof.json')
        .then((response) => {
           if (response.status !== 200) {
              throw new Error('status not 200'); 
           } 
           
           return response.json();
           
        })
        .then((data) => {
            if (data.url.slice(-3) === 'mp4') {
                dog.style.cssText = '';
                dog.innerHTML = `<video controls preload="none">
                                    <source src="${data.url}">
                                </video>`;
            } else {
                dog.innerHTML ='';
                dog.style.cssText = `background: url('${data.url}') center no-repeat`;
            }
        })
        .catch((error) => console.log(error));
});   