import './style.css';
import './minun-style.css';
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { showjoke } from './joke.js';
import { showpics } from './catpics.js';

//document.querySelector('#app').innerHTML = `täällä ollaan`;

//setupCounter(document.querySelector('#counter'))

let element = document.querySelector('.chuck');
console.log(element);
showjoke(element);
showjoke(document.querySelector('.toinen'));

showpics(document.querySelector('.pics'));




//async function joke() {
 // try {
  //  const response = await fetch('https://api.chucknorris.io/jokes/random');
  //  const data = await response.json();
  //  const jokePrint = document.querySelector('.show_joke');
  //  jokePrint.innerHTML = `${data.value}`;
 // } catch (error) {
 //   console.error('Virhe:', error);
 // }
//};


//joke();
