document.addEventListener('DOMContentLoaded', () => {
    const entriesContainer = document.getElementById('entries-container');

    // Fetch data from the API
    fetch('http://localhost:3000/api/entries')
        .then(response => response.json())
        .then(entries => {
            // Loop through the entries and create HTML elements to display them
            entries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('entry');

                entryDiv.innerHTML = `
                <div class="card" id="left">
        <img src="http://placekitten.com/200/500" height="300px" alt="kis-kis">
        <div class="card-content">
          <h4>${new Date(entry.entry_date).toLocaleDateString()}</h4>
          <p>${entry.notes}</p>
        </div>
      </div>
                  
                `;

                entriesContainer.appendChild(entryDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

