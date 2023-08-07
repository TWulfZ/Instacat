const URL = 'https://api.thecatapi.com/v1/images/search';
const img = document.querySelector('img');

/*fetch(URL)
    .then(res => res.json())
    .then(data => {
        img.src = data[0].url
    })*/

async function fetchData(urlApi) {
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
}

async function traerGatos() {
    try {
        const data = await fetchData(URL)
        img.src = data[0].url

    } catch (error) {
        console.log(error);
    }
};

function gatoRandom() {
    traerGatos();
}