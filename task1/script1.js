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
        elment2.setAttribute('id', this.selector);
        elment2.textContent = 'elment2';
        elment2.style.cssText = 'height :' + this.height + ';' +
                                'width :' + this.width + ';' + 
                                'background :' + this.bg + ';' +
                                'font-size :' + this.fontSize + ';';
        document.querySelector('body').appendChild(elment2);
    }
};


let domElement = new DomElement('.new', '50px','100px','green','30px');
domElement.newElement();
let domElement2 = new DomElement('#new', '100px','200px','red','50px');
domElement2.newElement();






