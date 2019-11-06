'use strict';

function DomElement (selector,height,width,bg,fontSize,position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize; 
    this.position = position;
};

DomElement.prototype.newElement = function() {
    if (this.selector.slice(0,1) ===  '.'){
        let elment1 = document.createElement('div');
        elment1.classList.add('"' + this.selector.slice(1) + '"');
        elment1.textContent = 'elment1';
        elment1.style.cssText = 'height :' + this.height + ';' +
                                'width :' + this.width + ';' + 
                                'background :' + this.bg + ';' +
                                'font-size :' + this.fontSize + ';' +
                                'position :' + this.position + ';';
        document.querySelector('body').appendChild(elment1);
    } else if (this.selector.slice(0,1) ===  '#') {
        let elment2 = document.createElement('p');
        elment2.classList.add('"' + this.selector.slice(1) + '"');
        elment2.textContent = 'elment2';
        elment2.style.cssText = 'height :' + this.height + ';' +
                                'width :' + this.width + ';' + 
                                'background :' + this.bg + ';' +
                                'font-size :' + this.fontSize + ';';
        document.querySelector('body').appendChild(elment2);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    let domElement3 = new DomElement('.square', '100px','100px','blue','0px','absolute');
    domElement3.newElement(); 

function callbackFunction(event) {
    
    if (event.key === 'ArrowLeft') {
        let coordsElement = document.querySelector('div').offsetLeft;
        let coordsSum = coordsElement - 10;
        document.querySelector('div').style.left = coordsSum+"px";
    } else if (event.key === 'ArrowUp') {
        let coordsElement = document.querySelector('div').offsetTop;
        let coordsSum = coordsElement - 10;
        document.querySelector('div').style.top = coordsSum+"px";
    } else if (event.key === 'ArrowDown') {
        let coordsElement = document.querySelector('div').offsetTop;
        let coordsSum = coordsElement + 10;
        document.querySelector('div').style.top = coordsSum+"px";
    } else if (event.key === 'ArrowRight') {
        let coordsElement = document.querySelector('div').offsetLeft;
        let coordsSum = coordsElement + 10;
        document.querySelector('div').style.left = coordsSum+"px";
    }
}
document.addEventListener('keydown', callbackFunction);

});



