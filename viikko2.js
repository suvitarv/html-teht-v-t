const browserLang = window.navigator.language
let lng = `Selaimen kieli: ${browserLang}`;

const screenWidth = screen.availWidth;
const screenHeight = screen.availHeight;
let print2 = `Näytön koko: ${screenWidth} x ${screenHeight}`;

let browserWidth = innerWidth;
let browserHeight = innerHeight;
let browser = `Selaimen koko: ${browserWidth} x ${browserHeight}`;

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};
const event = new Date().toLocaleDateString('fi-FI', options);
let date = `Päivämäärä ja aika: ${event}`;



document.querySelector('.language').textContent = lng;
document.querySelector('.screen_size').innerHTML = print2;
document.querySelector('.browser_size').innerHTML = browser;
document.querySelector('.date').innerHTML = date;