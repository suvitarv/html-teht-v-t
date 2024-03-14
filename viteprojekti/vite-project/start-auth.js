import { fetchData } from "./fetch.js";

// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const createUser = document.querySelector("#register_button");

createUser && createUser.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log("Nyt luodaan käyttäjä");

  const url =
    "https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/users";

  //# Create user
  //POST http://127.0.0.1:3000/api/users
  // content-type: application/json

  const form = document.querySelector("#register_form");
  const username = form.querySelector("input[name=username]").value;

  const data = {
    username: username,
    password: form.querySelector("input[name=password]").value,
    email: form.querySelector("input[name=email]").value,
  };

  const options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  try {
    fetchData(url, options).then((data) => {
      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }
});

// haetaan nappi josta haetaan formi ja logataan sisään
// tästä saadaan TOKEN
const loginUser = document.querySelector("#login_button");

loginUser && loginUser.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log("Nyt logataan sisään");

  //# Login
  //  POST http://localhost:3000/api/auth/login
  //  content-type: application/json

  //     {
  //    "username": "user",
  //    "password": "secret"
  //  }
  const url =
    "https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/auth/login";

  const form = document.querySelector("#login_form");
  //const username = form.querySelector('input[name=username]').value;

  const data = {
    username: form.querySelector("input[name=username]").value,
    password: form.querySelector("input[name=password]").value,
  };

  const options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  fetchData(url, options).then((data) => {
    console.log(data);
    console.log(data.token);
    localStorage.setItem("token", data.token);
    if (data.token === undefined) {
      alert("Username or password is incorrect");
    } else {
      alert(data.message);
      location.href = "app.html";
      localStorage.setItem("name", data.user.username);
    }
    logResponse(
      "loginResponse",
      `Localstorage set with token value: ${data.token}`
    );
  });
});

// Haetaan nappi josta testataan TOKENIN käyttöä, /auth/me
const meRequest = document.querySelector("#meRequest");
meRequest.addEventListener("click", async () => {
  console.log("Testataan TOKENIA ja haetaan käyttäjän tiedot");

  //# Get user info by token (requires token)
  //GET http://localhost:3000/api/auth/me
  // Authorization: Bearer (put-user-token-here)

  const url =
    "https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/auth/me";
  const muntokeni = localStorage.getItem("token");
  console.log("Tämä on haettu localstoragesta", muntokeni);

  const options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: "Bearer: " + muntokeni,
    },
  };

  fetchData(url, options).then((data) => {
    console.log(data);
    logResponse("meResponse", `Authorized user info: ${JSON.stringify(data)}`);
  });
});

// Haetaan nappi josta tyhjennetään localStorage
const clear = document.querySelector("#clearButton");
clear.addEventListener("click", clearLocalStorage);

// Apufunktio, kirjoittaa halutin koodiblokin sisään halutun tekstin
function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}

// Apufunktio, Tyhjennä local storage
function clearLocalStorage() {
  localStorage.removeItem("token");
  logResponse("clearResponse", "localStorage cleared!");
}
