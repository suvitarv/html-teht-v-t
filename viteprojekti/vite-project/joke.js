export function showjoke(element) {

   async function getjoke() {
        console.log('Moro, täällä ollaan');
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        console.log(response);
        if (!response.ok) throw new Error('invalid search');

        const jokes = await response.json();
        console.log(jokes);
        console.log(jokes.value);

        document.querySelector('.show_joke').innerHTML = jokes.value;

    } catch (error) {
        console.log(error)
    }
    }
    
    
    
    console.log(element);
    element.addEventListener('click', () => getjoke());
}

