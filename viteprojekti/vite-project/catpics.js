export function showpics(element) {
    //haetaan kissakuvat json tiedostosta
    //muokataan index.html tietoja
    async function modifyHTMpics() {
         console.log('Haetaan kuvat paikallisesta json tiedostosta!');

         try {
            const response = await fetch('catpics.json');
            if (!response.ok) throw new Error('invalid search');
            const images = await response.json();

            console.log(images);
            const alt = images[1].name;
            const figurecap = images[1].description;
            const imagesrc = images[1].address;

            //haetaan kuvaelementti html tiedostosta
            const kuva = document.querySelector('img');
            kuva.src = imagesrc;

            kuva.alt = alt;
          //haetaan kuvateksti html tiedostosta
            const kuvateksti = document.querySelector('figcaption');
            kuvateksti.innerText = figurecap;


         } catch (error) {
            console.log(error);
         }
    }

    // toinen funktio
    async function createpics() {
        console.log('Luodaan kuvat lennossa!');
    
        try {
           const response = await fetch('catpics.json');
           if (!response.ok) throw new Error('invalid search');
           const images = await response.json();
    
           images.forEach((element) => {
            console.log(`Nimi: ${element.name}`);
           });
    
           console.log(images);
    
           const cards = document.querySelector('#card');
           cards.innerHTML = '';
    
           const alt = images[1].name;
            const figurecap = images[1].description;
            const imagesrc = images[1].address;
    
    
           const figure = document.createElement('figure');
           cards.appendChild(figure);
    
           const image = document.createElement('img');
           image.src = imagesrc;
           image.alt = alt;
    
           figure.appendChild(image);
    
    
           const figurecaption = document.createElement('figurecaption');
           const node = document.createTextNode(figurecap);
           figurecaption.appendChild(node);
           figure.appendChild(figurecaption);
    
    
    
    
    
        } catch (error) {
           console.log(error);
        }
    }
    

// 3.versio
async function createpicsloop() {
    console.log('Luodaan kuvat lennossa!');

    try {
       const response = await fetch('catpics.json');
       if (!response.ok) throw new Error('invalid search');
       const images = await response.json();
       
       console.log(images);
       const cards = document.querySelector('#card');
       cards.innerHTML = '';
       

       images.forEach((item) => {
       console.log(`Nimi: ${item.name}`);

       const figure = document.createElement('figure');
       cards.appendChild(figure);

       const image = document.createElement('img');
       image.src = item.address;
       image.alt = item.name;

       figure.appendChild(image);


       const figurecaption = document.createElement('figurecaption');
       const node = document.createTextNode('aika kiva kissa');
       figurecaption.appendChild(node);
       figure.appendChild(figurecaption);

       });


    } catch (error) {
       console.log(error);
    }
    }

    console.log(element);
    //element.addEventListener('click', () => modifyHTMpics());
    //element.addEventListener('click', () => createpics());
    element.addEventListener('click', () => createpicsloop());

}
