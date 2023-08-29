const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_S74paLmn16pYEYzcL84B8sUuXuUjXaxpyW1qj7VawUOUtGnrvVREfXTFMHSpZH3b';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?limit=25&';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const spanError = document.getElementById('span');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

const button = document.querySelector('button');

async function generarGatosRandom() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log(res.status);
    if (res.status !== 200) {
        spanError.textContent = `Hubo un error: ${res.status}`;
    } else {
        img1.src = data[0].url;
        img2.src = data[1].url;
        btn1.onclick = () => guardarGatitosFavoritos(data[0].id);
        btn2.onclick = () => guardarGatitosFavoritos(data[1].id);
    }
}

async function cargarGatosFavoritos() {
    const res = await fetch(API_URL_FAVOURITES, {
        mehtod: 'GET',
        headers: {
            'x-api-key': 'live_S74paLmn16pYEYzcL84B8sUuXuUjXaxpyW1qj7VawUOUtGnrvVREfXTFMHSpZH3b'
        }
    });
    const data = await res.json();
    console.log(res.status);
    if (res.status !== 200) {
        spanError.textContent = `Hubo un error: ${res.status}`;
    } else {
        const section = document.getElementById('gatosFavoritos');
        section.innerHTML = "";
        const h2 = document.createElement("h2");
        const h2Text = document.createTextNode('Gatos Favoritos');

        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(gato => {
            const section = document.getElementById('gatosFavoritos')
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Eliminar de favoritos');

            btn.appendChild(btnText);
            img.src = gato.image.url;
            img.width = 150;
            btn.onclick = () => eliminarGatitosFavoritos(gato.id);

            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function guardarGatitosFavoritos(id) {
    const res = await fetch(API_URL_FAVOURITES,
        {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                'x-api-key': 'live_S74paLmn16pYEYzcL84B8sUuXuUjXaxpyW1qj7VawUOUtGnrvVREfXTFMHSpZH3b'
            },
            body: JSON.stringify({
                image_id: id,
            }),
        });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.textContent = `Hubo un error: ${res.status + data.message} `;
    } else {
        console.log('Guardado en favoritos');
        cargarGatosFavoritos();
    }
}

async function eliminarGatitosFavoritos(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id),
        {
            method: 'DELETE',
            headers: {
                'x-api-key': 'live_S74paLmn16pYEYzcL84B8sUuXuUjXaxpyW1qj7VawUOUtGnrvVREfXTFMHSpZH3b'
            }
        });
    const data = await res.json();
    console.log('Eliminado');
    if (res.status !== 200) {
        spanError.textContent = `Hubo un error: ${res.status}`;
    } else {
        cargarGatosFavoritos()
    }
}

cargarGatosFavoritos();
generarGatosRandom();
