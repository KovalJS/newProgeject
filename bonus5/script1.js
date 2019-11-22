'use strict';

const colorElement = document.querySelector('#color'),
  changeElement = document.querySelector('#change'),
  bodyElement = document.querySelector('body');

  changeElement.addEventListener('click', () => {
    let r = Math.floor(Math.random() * 256);

    let g = Math.floor(Math.random() * 256);

    let b = Math.floor(Math.random() * 256);

    let c = '#' + r.toString(16) + g.toString(16) + b.toString(16);

    bodyElement.style.cssText = `background-color: ${c}`;

    colorElement.textContent = c;
  });
  