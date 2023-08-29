//Cambiar Tema Blanco y Negro
function cambiarApariencia() {
    const logoClass = document.querySelector('.logo');
    const iconElement = document.querySelector('.icon');
    const appearance = document.getElementById('appearance');
    var color = 1; //0 Blanco - 1 Negro
    appearance.addEventListener('click', function () {
        if (color === 1) {
            document.documentElement.style.setProperty('--fondo', '#000000');
            document.documentElement.style.setProperty('--fondo2', '#202020');
            document.documentElement.style.setProperty('--letras', '#ffffff');
            document.documentElement.style.setProperty('--iconos', 'invert(1)');
            document.documentElement.style.setProperty('--menu', '#202020');
            logoClass.style.filter = 'invert(1)';
            color--;
            console.log('pepe1');
        } else {
            document.documentElement.style.setProperty('--fondo', '#fff');
            document.documentElement.style.setProperty('--fondo2', '#dfdfdf');
            document.documentElement.style.setProperty('--letras', '#000000');
            document.documentElement.style.setProperty('--iconos', 'invert(0)');
            document.documentElement.style.setProperty('--menu', '#fff');
            iconElement.style.filter = 'invert(0)';
            logoClass.style.filter = 'invert(0)';
            color++;
            console.log('pepe2');
        }
    });
}

function menu() {
    const more = document.getElementById('more');
    const menu = document.getElementById('menu');
    more.addEventListener('click', function () {
        menu.classList.toggle("hide");
    });
}

function randomLike() {
    const min = 100000;
    const max = 300000;
    const randomNumber = Math.floor(Math.random() < 0.9 ? Math.random() * (max - min) + min : Math.random() * 700000 + 300000);
    const formattedNumber = randomNumber.toLocaleString(undefined, { style: 'decimal' });
    return formattedNumber;
}

function cargarPerfil() {
    const URL = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1`;
    const pfp = document.getElementsByClassName('user-profile');
    const profileSection = document.getElementById('profile');
    fetch(URL, {
        mehtod: 'GET',
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then(res => res.json())
        .then(data => {
            pfp[0].style.backgroundImage = `url('${data[0].url}')`; //Cargar imagen del usuario

            let profile = `<!--Profile-->
                <div class="right-s">
                    <img src="${data[0].url}" class="photos" alt="">
                    <div class="suggest-text">
                        <p class="">${data[0].breeds[0].id}</p>
                        <p class="secondary">${data[0].breeds[0].name}</p>
                    </div>
                </div>
                <div class="zzz">
                    <a href="#">Switch</a>
                </div>`

            profileSection.innerHTML = profile;
        });
}

async function eliminarGatitosFavoritos(id) {
    const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
    const res = await fetch(API_URL_FAVOURITES_DELETE(id),
        {
            method: 'DELETE',
            headers: {
                'x-api-key': API_KEY
            }
        });
    const data = await res.json();
    console.log('Eliminado');
    if (res.status !== 200) {
        console.log(`Hubo un error: ${res.status}`);
    } else {

    }
}

async function guardarGatitosFavoritos(id) {
    const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites';
    const res = await fetch(API_URL_FAVOURITES,
        {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                'x-api-key': API_KEY
            },
            body: JSON.stringify({
                image_id: id,
            }),
        });
    const data = await res.json();

    if (res.status !== 200) {
        console.log(`Hubo un error: ${res.status + data.message} `);
        return null;
    } else {
        console.log('Guardado en favoritos');
        return data.id;
    }
}


export { cambiarApariencia, menu, randomLike, cargarPerfil, eliminarGatitosFavoritos, guardarGatitosFavoritos };