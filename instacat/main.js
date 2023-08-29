import { cambiarApariencia, menu as menuSwitch, randomLike, cargarPerfil, eliminarGatitosFavoritos, guardarGatitosFavoritos } from './functions.js';

const URL_CATS = (num_cats) => `https://api.thecatapi.com/v1/images/search?limit=${num_cats}&has_breeds=1`

const status_wrapper = document.getElementById('historias');
const posts = document.getElementById('publicaciones');
const suggestions = document.getElementById('suggestions');
const favouritesBtn = document.getElementById('favouritesBtn');
const num_cats = 6; // numero de gatos que va a traer

favouritesBtn.addEventListener('click', function () {
    window.location.href = "./favs.html";

});

menuSwitch(); //Abre el menu para cambiar de tema
cambiarApariencia(); //Cambia de blanco y negro del archivo functions.js

cargarPerfil();


fetch(URL_CATS(num_cats), {
    mehtod: 'GET',
    headers: {
        'x-api-key': API_KEY
    }
})
    .then(res => res.json())
    .then(data => {
        let gatos = data;
        //crear las historias
        let status_cards = `${gatos.map(historia => `
            <div class="status-card">
                <div class="profile-pic"><img src="${historia.url}" alt="foto_gato"></div>
                <p class="username">${historia.breeds[0].name}</p>
            </div>`).slice(0, num_cats).join('')}`;

        //crear los posts
        let post_cards = `${gatos.map(post => `
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
                        <img src="./img/like.PNG" class="icon like" alt=""> 
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
            </div>`).slice(0, num_cats).join('')}`;

        //crear las sugerencias
        let suggest_card = `${gatos.map(gatos => `
            <div class="suggests">
            <!--suggests-->
            <div class="right-s">
                <img src="${gatos.url}" class="photos" alt="">
                <div class="suggest-text">
                    <p class="">${gatos.breeds[0].name}</p>
                    <p class="secondary">Followed by ${gatos.breeds[0].id}</p>
                </div>
            </div>
            <div class="zzz">
                <a href="#">Follow</a>
            </div>
        </div>
            `).slice(0, num_cats).join('')}`;

        if (status_wrapper && posts) {
            status_wrapper.classList.remove("loading");
            status_wrapper.innerHTML = status_cards;
            posts.innerHTML = post_cards;
            suggestions.innerHTML = suggest_card;

            //poner los id de los botones likes
            gatos.forEach((like, indexCat) => {
                let isLiked = false;
                let idCat = '';
                const liked = document.getElementsByClassName('like')[indexCat];
                liked.addEventListener("click", async function () {
                    if (!isLiked) {
                        liked.src = "./img/liked.png";
                        isLiked = true;
                        idCat = await guardarGatitosFavoritos(like.id);
                        console.log(idCat);
                    } else {
                        liked.src = "./img/like.PNG";
                        isLiked = false;
                        eliminarGatitosFavoritos(idCat);
                    }
                    console.log("Liked post!" + indexCat);
                });
            });
        }
    });