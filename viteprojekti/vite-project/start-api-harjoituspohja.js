import { fetchData } from "./fetch.js";

//Show app.html page who is login

function showUsername() {
  let name = localStorage.getItem("name");
  document.getElementById("name").innerText = name;
}

showUsername();

//Poista päivitys

async function deleteUser(evt) {
  console.log("Poistettu");
  console.log(evt);

  //tapa 1, haetaan arvo tutkimalla eventtiä
  const id = evt.target.attributes["data-id"].value;
  console.log(id);

  //tapa2 haetaan viereinen elementti
  const id2 = evt.target.parentElement.nextElementSibling.textContent;
  console.log("Toinen tapa", id2);

  const url = `https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/users/${id}`;
  let muntokeni = localStorage.getItem("token");

  const options = {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: "Bearer: " + muntokeni,
    },
  };

  const answer = confirm(
    `Oletko varma että haluat poistaa käyttäjän ID: ${id}`
  );
  if (answer) {
    fetchData(url, options).then((data) => {
      console.log(data);
    });
  }
}

// Update user post information
async function updateEntry(evt) {
  evt.preventDefault();
  console.log("Nyt päivitetään tietoja");
  const form = document.querySelector("#Update");

  let muntokeni = localStorage.getItem("token");

  if (!form.checkValidity()) {
    //If the form is not valid, show the validation messages
    form.reportValidity();
    return; // Exit function if form is not valid
  }

  console.log("Tiedot valideja, jatketaan");

  
  const data = {
    entry_id: form.querySelector("input[name=entry_id]").value,
    entry_date: form.querySelector("input[name=date]").value,
    mood: form.querySelector("select[name=moods]").value,
    weight: form.querySelector("input[name=weight]").value,
    sleep_hours: form.querySelector("input[name=hours]").value,
    notes: form.querySelector("textarea[name=notes]").value,
  };

  const url = `https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries/${data.entry_id}`;

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
    console.log(data);
    await getDiaryEntries();
  } catch (error) {
    console.error(error);
  }
}

//Create update form
function createUpdateForm(evt) {
  evt.preventDefault();
  const entry_id = evt.target.attributes["data-id"].value;
  fetch(
    `https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries/${entry_id}`,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: "Bearer: " + localStorage.getItem("token"),
      },
    }
  )
    .then((response) => response.json())
    .then((entry) => {
      const entryDiv = document.querySelector("#app_information");
      entryDiv.innerHTML = `
            <form id="Update">
                    <label for="created_at">Date</label><br>
                    <input type="date" id="date" name="date" required><br>
                    <input type="hidden" name="entry_id" value="${entry[0].entry_id}">
                    <label for="mood">Select mood:</label><br>
                    <select id="moods" name="moods" required>
                        <option value=""></option>
                        <option value="Happy" selected>Happy</option>
                        <option value="Sad">Sad</option>
                        <option value="Exided">Exided</option>
                        <option value="Angry">Angry</option>
                      </select><br>
                  <!--  <input type="text" id="mood" name="mood" value=""><br> -->
                    <label for="weight">Weight:</label><br>
                    <input type="text" id="weight" name="weight" value="${entry[0].weight}" required><br>
                    <label for="sleep_hours">Sleep_hours:</label><br>
                    <input type="int" id="sleep" name="hours" value="${entry[0].sleep_hours}" required><br>
                    <label for="notes">Notes</label><br>
                    <textarea id="notes" name="notes" value="${entry[0].notes}" required>${entry[0].notes}</textarea><br>
                    <input name="submit" type="submit" value="Update" id="Update_button" />
                </form>
            `;
      const insertEntryButton = document.createElement("button");
      insertEntryButton.textContent = "Insert Entry";
      insertEntryButton.setAttribute("data-id", entry.entry_id);
      insertEntryButton.addEventListener("click", createInsertEntryForm);
      entryDiv.appendChild(insertEntryButton);
      Update_button.addEventListener("click", updateEntry);
    })
    .catch((error) => console.error("Error fetching data:", error));
}
//Return post form when user is update post information
function createInsertEntryForm() {
  const entryDiv = document.querySelector("#app_information");

  entryDiv.innerHTML = `
                <form id="post">
                    <label for="created_at">Date</label><br>
                    <input type="date" id="date" name="date" required><br>
                    <label for="mood">Select mood:</label><br>
                    <select id="moods" name="moods" required>
                        <option value="#"></option>
                        <option value="Happy">Happy</option>
                        <option value="Sad">Sad</option>
                        <option value="Exided">Exided</option>
                        <option value="Angry">Angry</option>
                      </select><br>
                  <!--  <input type="text" id="mood" name="mood" value=""><br> -->
                    <label for="weight">Weight:</label><br>
                    <input type="text" id="weight" name="weight" value="" required><br>
                    <label for="sleep_hours">Sleep_hours:</label><br>
                    <input type="int" id="sleep" name="hours" value="" required><br>
                    <label for="notes">Notes</label><br>
                    <textarea id="notes" name="notes" value="" required></textarea><br>
                    <input name="submit" type="submit" value="Post" class="post" />
                    
                </form>
  `;
}

//Post information
const postHealth = document.querySelector(".post");

postHealth.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log("Lisätään tietoja");

  const url =
    "https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries";
  let muntokeni = localStorage.getItem("token");

  const form = document.querySelector("#post");

  if (!form.checkValidity()) {
    
    form.reportValidity();
    return; 
  }

  console.log("Tiedot valideja, jatketaan");

  const body = {
    entry_date: form.querySelector("input[name=date]").value,
    mood: form.querySelector("select[name=moods]").value,
    weight: form.querySelector("input[name=weight]").value,
    sleep_hours: form.querySelector("input[name=hours]").value,
    notes: form.querySelector("textarea[name=notes]").value,
  };

  const options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: "Bearer: " + muntokeni,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  };
  console.log(body);

  fetchData(url, options).then(async (data) => {
    console.log(data);
    await getDiaryEntries();
  });
});


//Delete post 
const deleteEntry = async (evt) => {
  evt.preventDefault();
  const entry_id = evt.target.attributes["data-id"].value;

  const answer = confirm(
    `Oletko varma että haluat poistaa päivityksen ID:llä ${entry_id}`
  );
  if (answer) {
    fetch(
      `https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries/${entry_id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: "Bearer: " + localStorage.getItem("token"),
        },
      }
    );
    await getDiaryEntries();
  }
};

// Get users diaryEntries
const getDiaryEntries = async () => {
  const entriesContainer = document.getElementById("entries_container");
  entriesContainer.innerHTML = "";
  let muntokeni = localStorage.getItem("token");
  // Fetch data from the API
  fetch(
    "https://hyte-server-suvta.northeurope.cloudapp.azure.com/api/entries",
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: "Bearer: " + muntokeni,
      },
    }
  )
    .then((response) => response.json())
    .then((entries) => {
      // Loop through the entries and create HTML elements to display them
      entries.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        entryDiv.innerHTML = `
              <div class="card" id="information_card">
      <div class="card-content">
        <h4>${new Date(entry.entry_date).toLocaleDateString()}</h4>
        <p>${entry.notes}</p>

      </div>
    </div>
                
              `;
        const delete_button = document.createElement("button");
        delete_button.textContent = "Delete";
        delete_button.setAttribute("data-id", entry.entry_id);
        delete_button.addEventListener("click", deleteEntry);
        entryDiv.querySelector(".card-content").appendChild(delete_button);

        const update_button = document.createElement("button");
        update_button.textContent = "Update";
        update_button.setAttribute("data-id", entry.entry_id);
        update_button.addEventListener("click", createUpdateForm);
        entryDiv.querySelector(".card-content").appendChild(update_button);

        entriesContainer.appendChild(entryDiv);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
};

document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
  }
  await getDiaryEntries();
});

//Logout

const out = document.querySelector("#logout");

out.addEventListener("click", logOut);

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem("token");
  console.log("logginout");
  window.location.href = "login.html";
}
