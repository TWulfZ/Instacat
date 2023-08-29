import { cambiarApariencia, menu as menuSwitch, randomLike, cargarPerfil, eliminarGatitosFavoritos, guardarGatitosFavoritos } from './functions.js';

const URL_CATS = (idFavor) => `https://api.thecatapi.com/v1/images/${idFavor}`
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?limit=25&';

const status_wrapper = document.getElementById('historias');
const posts = document.getElementById('publicaciones');
const suggestions = document.getElementById('suggestions');
const homeBtn = document.getElementById('homeBtn');
const num_cats = 6; //historias

homeBtn.addEventListener('click', function () {
    window.location.href = "./feed.html";
});

menuSwitch(); //Abre el menu para cambiar de tema
cambiarApariencia(); //Cambia de blanco y negro del archivo functions.js

cargarPerfil();

async function cargarGatosFavoritos() {
    const res = await fetch(API_URL_FAVOURITES, {
        mehtod: 'GET',
        headers: {
            'x-api-key': API_KEY,
        }
    });

    const data = await res.json();
    console.log(res.status);
    if (res.status !== 200) {
    } else {
        posts.innerHTML = '';
        data.forEach((gato, indexCat) => {
            gatosFavoritos(gato.image_id, indexCat, gato.id);
            console.log(indexCat);
        });
    }
};

function gatosFavoritos(idImage, indexCat, idCat) {
    fetch(URL_CATS(idImage), {
        mehtod: 'GET',
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then(res => res.json())
        .then(datas => {
            let post = datas;
            //crear los posts
            let post_cards = `
                    <div class="post">
                    <div class="info">
                        <div class="user">
                            <div class="profile-pic"><img src="${post.url}" alt=""></div>
                            <p class="username">${post.breeds[0].name}</p>
                        </div>
                        <img src="./img/option.PNG" class="options icon" alt="">
                    </div>
                    <img src="${post.url}" class="post-image" alt="">
                    <div class="post-content">
                        <div class="reaction-wrapper">
                            <img src="./img/liked.png" class="icon like" alt=""> 
                            <img src="./img/comment.PNG" class="icon" alt="">
                            <img src="./img/send.PNG" class="icon" alt="">
                            <img src="./img/save.PNG" class="save icon" alt="">
                        </div>
                        <p class="likes">${randomLike()} likes</p>
                        <p class="description"><span>${post.breeds[0].name} </span> ${post.breeds[0].description} </p>
                    </div>
                    <div class="comment-wrapper">
                        
                        <input type="text" class="comment-box" placeholder="Add a comment">
                        <button class="comment-btn">post</button>
                        <img src="./img/smile.PNG" class="icon" alt="">
                    </div>
                </div>`;

            if (posts) {
                posts.innerHTML += post_cards;

                //poner los id de los botones likes
                let isLiked = true;
                const liked = document.getElementsByClassName('like')[indexCat];
                liked.addEventListener("click", async function () {
                    if (!isLiked) {
                        liked.src = "./img/liked.png";
                        isLiked = true;
                        idCat = await guardarGatitosFavoritos(post.id);
                        console.log(idCat);
                    } else {
                        liked.src = "./img/like.PNG";
                        isLiked = false;
                        eliminarGatitosFavoritos(idCat);
                        cargarGatosFavoritos();
                    }
                    console.log("Liked post!" + indexCat);
                });
            }
        });
}

cargarGatosFavoritos();






