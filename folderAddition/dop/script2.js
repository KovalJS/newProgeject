
let imgGirl = document.querySelector('.imgGirl'),
    startStop = document.querySelector('#startStop'),
    reset = document.querySelector('#reset'),
    flyInterval,
    counts = 0;

let runningGirl = function() {
    flyInterval = requestAnimationFrame(runningGirl);
    counts++;

    if (counts < 900) {
        imgGirl.style.left = counts + 'px';
    } else {
        cancelAnimationFrame(flyInterval);
    }
};               
    
let animate = true;

startStop.addEventListener('click', () => {
    if (animate) {
        animate = false;
        flyInterval = requestAnimationFrame(runningGirl);
    } else {
        animate = true;
        cancelAnimationFrame(flyInterval);
    }
});

reset.addEventListener('click', () => {
    cancelAnimationFrame(flyInterval);
    counts = 0;
    imgGirl.style.left = 0;
});
              

/*
let imgGirl = document.querySelector('.imgGirl'),
    counts = 0;

let runningGirl = function() {
    counts++;

    imgGirl.style.top = counts + 'px';

    setTimeout(runningGirl, 10); 
};  

setTimeout(runningGirl, 10);
*/