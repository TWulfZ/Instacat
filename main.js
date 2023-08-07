const URL = 'https://api.thecatapi.com/v1/images/search?limit=100';
const img = document.querySelector('img');
const button = document.querySelector('button');

/*fetch(URL)
    .then(res => res.json())
    .then(data => {
        img.src = data[0].url
    })*/

async function myCat() {
    const res = await fetch(URL);
    const data = await res.json();
    img.src = data[0].url;
    console.log(data);
}

