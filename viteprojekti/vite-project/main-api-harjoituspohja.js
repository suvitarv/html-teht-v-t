import './styles.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { fetchData } from './fetch.js';

document.querySelector('#app').innerHTML = 'Moi tässä oman APIn harjoituksia';

const bt1 = document.querySelector('get_users');
bt1.addEventListener('click', getAllUsers);


async function getAllUsers() {
    console.log('toimii!!')

    try {
        const response = await fetch('http://127.0.0.1:3000/api/users');
        console.log(response);
        const data = await response.json();
        console.log(data);

        data.array.forEach((element) => {
            console.log(element.username);
        });
    } catch (error) {
        console.log(error);
    }
};