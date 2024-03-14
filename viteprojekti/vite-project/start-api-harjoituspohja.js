import './style-auth.css';
import { fetchData } from './fetch.js';

const bt1 = document.querySelector('.get_entry');
bt1.addEventListener('click', async () => {
    console.log('Klikki toimii');
    const url = 'https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries/1';

    fetchData(url).then((data) => {

        //käsitellään fetchdata funktiosta tullut JSON
        console.log(data);

    });
});

function showUsername() {
 // console.log('Hei, testataas saadaanko käyttäjänimi haettua tähän');
 // let name = localStorage.getItem('name');

 // console.log('Your name is: ', name);
 // document.getElementById('name').innerText = name;
//}

const allButton = document.querySelector('.get_users');
allButton.addEventListener('click', getUsers);

async function getUsers() {
  console.log('Hei täällä ollaan');
  const url = 'https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/users';
  const muntokeni = localStorage.getItem('token');

const options = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  headers: {
    Authorization: 'Bearer: ' + muntokeni,
  },
}; 

fetchData (url, options).then((data) => {
  console.log(data);
  createTable(data);
});
}

function createTable(data) {
  console.log(data);

  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = ''
  // array.forEach(tähän voi keksiä nimen mikä helpottaa ymmärtämään)Metodi iteroi jokaisen taulukon rivin
  data.forEach(rivi => {
    console.log(rivi.user_id, rivi.username, rivi.user_level);
    
    const tr = document.createElement('tr');
   

    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    
    td1.innerText = rivi.username;
    td2.innerText = rivi.user_level;


    //const td3 = document.createElement('td');
    //td3.innerHTML = `<button class="check" data-id"${rivi.user_id}">Info</button>`

    const td3 = document.createElement('td');
    const button1 = document.createElement('button');
    button1.className = 'check';
    button1.setAttribute('data-id', rivi.user_id);
    button1.innerText = 'Info';
    td3.appendChild(button1);

    button1.addEventListener('click', getUsers);

    const td4 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.className = 'del';
    button2.setAttribute('data-id', rivi.user_id);
    button2.innerText = 'Delete';
    td4.appendChild(button2);

    button2.addEventListener('click', deleteUser);

    const td5 = document.createElement('td');
    td5.innerText = rivi.user_id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);

  });
}

const url = 'https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/auth/me';
const muntokeni = localStorage.getItem('token');

const options = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  headers: {
    Authorization: 'Bearer: ' + muntokeni,
  },
}
fetchData (url, options).then((data) => {
  console.log(data);
  document.getElementById('name').innerText = data.user.username;
});
}


showUsername();

function deleteUser(evt) {
  console.log('Poistettu');
  console.log(evt);

  //tapa 1, haetaan arvo tutkimalla eventtiä
  const id = evt.target.attributes['data-id'].value;
  console.log(id);

  //tapa2 haetaan viereinen elementti
  const id2 = evt.target.parentElement.nextElementSibling.textContent;
  console.log('Toinen tapa', id2);


  const url = `https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/users/${id}`;
  const muntokeni = localStorage.getItem('token');

const options = {
  method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  headers: {
    Authorization: 'Bearer: ' + muntokeni,
  },
}

const answer = confirm(`Oletko varma että haluat poistaa käyttäjän ID: ${id}`);
if (answer) {
  fetchData(url, options).then((data) => {
    console.log(data);
  })

} 

}

// 1. testataan ensin YKSI endpoint joka ei vaadi tokenia
// 2. uudelleen strukturoidaan koodi jotta se on modulaarisempi

// tämä toimi ennen autentikaatiota, nyt tarvitsee tokenin, siistitään pian!
// sivuille on nyt myös lisätty navigaatio html sivuun, sekä siihen sopiva CSS koodi, hae siis uusi HTML ja UUSI CSS ennen kun aloitat

async function getAllUsers() {
  console.log('toimii!');

  try {
    const response = await fetch('https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/users');
    console.log(response);
    const data = await response.json();
    console.log(data);

    data.forEach((element) => {
      console.log(element.username);
    });

    // tänne tiedot
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';

    data.forEach((element) => {
      console.log(element.username);

      // Create table row element
      var tr = document.createElement('tr');

      // td1 Username
      var td1 = document.createElement('td');
      td1.innerText = element.username;

      // td2
      var td2 = document.createElement('td');
      td2.innerText = element.user_level;

      // td3
      var td3 = document.createElement('td');
      var button1 = document.createElement('button');
      button1.className = 'check';
      button1.setAttribute('data-id', '1');
      button1.innerText = 'Info';
      td3.appendChild(button1);

      // td4
      var td4 = document.createElement('td');
      var button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', '1');
      button2.innerText = 'Delete';
      td4.appendChild(button2);

      // td5
      var td5 = document.createElement('td');
      td5.innerText = element.user_id;

      // Append table data elements to the table row element
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      // Append the table row element to the table (assuming you have a table with the id 'myTable')
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.log(error);
  }
}
// tehdään nyt tätä PUT toimintoon 

const updateUser = document.querySelector(".update");

updateUser.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log('Nyt päivitetään tietoja')

  const url = "https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/users";
  let muntokeni = localStorage.getItem("token");

  const form = document.querySelector(".addform");

  
  if (!form.checkValidity()) {
    // If the form is not valid, show the validation messages
    form.reportValidity();
    return; // Exit function if form is not valid
  }

  console.log("Tiedot valideja, jatketaan");

  const username = form.querySelector("input[name=username]").value;

  // kokeillaan ensin kovakoodattuna
  // const body = {
  //   username: 'testii',
  //   password: 'testii',
  //   email: 'testii@testii.fi',
  // };

  const data = {
    username: username,
    password: form.querySelector("input[name=password]").value,
    email: form.querySelector("input[name=email]").value,
  };

  const options = {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: "Bearer: " + muntokeni,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  try {
    const responseData = await fetchData(url, options);
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
});