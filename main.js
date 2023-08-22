const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_S74paLmn16pYEYzcL84B8sUuXuUjXaxpyW1qj7VawUOUtGnrvVREfXTFMHSpZH3b';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?limit=2';

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const button = document.querySelector('button');

const spanError = document.getElementById('error');
/* fetch(URL)
    .then(res => res.json())
    .then(data => {
        img.src = data[0].url;
    }) */
async function generarGatosRandom() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('---------------GATOS ALETORIOS-----------------');
    console.log(data);

    if (res.status !== 200) {
        spanError.innerText = `Hubo un error: ${res.status}`;
    } else {
        img1.src = data[0].url;
        img2.src = data[1].url;
    }
}

async function agregarGatosFavoritos() {
    const res = await fetch(API_URL_FAVOURITES);
    const data = await res.json();
    console.log('---------------GATOS ALETORIOS-----------------');
    console.log(data);
    if (res.status !== 200) {
        spanError.textContent = `Hubo un error: ${res.status}`;
    } else {

    }
}
agregarGatosFavoritos();
generarGatosRandom();
