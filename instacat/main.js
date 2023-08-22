const URL = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${API_KEY}`;
const img = document.querySelector('img');
const button = document.querySelector('button');
const pfp = document.getElementsByClassName('user-profile');
const status_wrapper = document.getElementById('historias');
const posts = document.getElementById('publicaciones');
const more = document.getElementById('more');
const menu = document.getElementById('menu');
const appearance = document.getElementById('appearance');
const iconElement = document.querySelector('.icon');
const logoClass = document.querySelector('.logo');

const num_stat = 6; //historias

console.log(API_KEY);

more.addEventListener('click', function () {
    menu.classList.toggle("hide");
});

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
    } else {
        document.documentElement.style.setProperty('--fondo', '#fff');
        document.documentElement.style.setProperty('--fondo2', '#dfdfdf');
        document.documentElement.style.setProperty('--letras', '#000000');
        document.documentElement.style.setProperty('--iconos', 'invert(0)');
        document.documentElement.style.setProperty('--menu', '#fff');
        iconElement.style.filter = 'invert(0)';
        logoClass.style.filter = 'invert(0)';
        color++;
    }
});

function randomLike() {
    const min = 100000;
    const max = 300000;
    const randomNumber = Math.floor(Math.random() < 0.9 ? Math.random() * (max - min) + min : Math.random() * 700000 + 300000);
    const formattedNumber = randomNumber.toLocaleString(undefined, { style: 'decimal' });
    return formattedNumber;
}


fetch(`https://api.thecatapi.com/v1/images/search?limit=1&api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        pfp[0].style.backgroundImage = `url('${data[0].url}')`; //Cargar imagen del usuario

    });

//cargar imagen de las historias
fetch(`https://api.thecatapi.com/v1/images/search?limit=${num_stat}&has_breeds=1&api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        gatos = data;
        let status_cards = `${gatos.map(historia => `
            <div class="status-card">
                <div class="profile-pic"><img src="${historia.url}" alt="foto_gato"></div>
                <p class="username">${historia.breeds[0].name}</p>
            </div>`).slice(0, num_stat).join('')}`;

        let post_cards = `${gatos.map(post => `
                <div class="post">
                <div class="info">
                    <div class="user">
                        <div class="profile-pic"><img src="${post.url}" alt=""></div>
                        <p class="username">${post.breeds[0].name}</p>
                    </div>
                    <img src="img/option.PNG" class="options icon" alt="">
                </div>
                <img src="${post.url}" class="post-image" alt="">
                <div class="post-content">
                    <div class="reaction-wrapper">
                        <img src="img/like.PNG" class="icon" alt="">
                        <img src="img/comment.PNG" class="icon" alt="">
                        <img src="img/send.PNG" class="icon" alt="">
                        <img src="img/save.PNG" class="save icon" alt="">
                    </div>
                    <p class="likes">${randomLike()} likes</p>
                    <p class="description"><span>${post.breeds[0].name} </span> ${post.breeds[0].description} </p>
                </div>
                <div class="comment-wrapper">
                    
                    <input type="text" class="comment-box" placeholder="Add a comment">
                    <button class="comment-btn">post</button>
                    <img src="img/smile.PNG" class="icon" alt="">
                </div>
            </div>`).slice(0, num_stat).join('')}`;

        if (status_wrapper && posts) {
            status_wrapper.classList.remove("loading");
            status_wrapper.innerHTML = status_cards;
            posts.innerHTML = post_cards;
        }
    });




