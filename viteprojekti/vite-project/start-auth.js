import { fetchData } from "./fetch.js";

// Register
const createUser = document.querySelector("#register_button");

createUser && createUser.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log("Nyt luodaan käyttäjä");

  const url =
    "https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/users";


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

//Login
const loginUser = document.querySelector("#login_button");

loginUser && loginUser.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log("Nyt logataan sisään");

  const url =
    "https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/auth/login";

  const form = document.querySelector("#login_form");

  const data = {
    username: form.querySelector("input[name=username]").value,
    password: form.querySelector("input[name=password]").value,
  };

  const options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(data), 
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
      localStorage.setItem("user_id", data.user.user_id);
    }
    logResponse(
      "loginResponse",
      `Localstorage set with token value: ${data.token}`
    );
  });
});

