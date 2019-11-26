'use strict';

import 'fetch-polyfill';
import 'es6-promise';
import 'formdata-polyfill';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import mouseHover from './modules/mouseHover';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('18 january 2020');
//Menu
toggleMenu();
//popup
togglePopUp();
//табы
tabs();
//слайдер
slider();
//наша команда 
mouseHover();
//калькулятор 
calc(100);
//send-ajax-form
sendForm();