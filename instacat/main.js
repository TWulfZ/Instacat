const URL = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${API_KEY}`;
const img = document.querySelector('img');
const button = document.querySelector('button');
const pfp = document.getElementsByClassName('user-profile');
const status_wrapper = document.getElementById('historias');
const posts = document.getElementById('publicaciones');

const num_stat = 6; //historias

console.log(API_KEY);

function randomLike() {
    const min = 100000;
    const max = 300000;
    const randomNumber = Math.floor(Math.random() < 0.9 ? Math.random() * (max - min) + min : Math.random() * 700000 + 300000);
    const formattedNumber = randomNumber.toLocaleString(undefined, { style: 'decimal' });
    return formattedNumber;
}

//cargar imagen de las historias
fetch(`https://api.thecatapi.com/v1/images/search?limit=1&api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        pfp[0].style.backgroundImage = `url('${data[0].url}')`; //Cargar imagen del usuario
    });

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
                    <img src="img/option.PNG" class="options" alt="">
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
                    <img src="img/smile.PNG" class="icon" alt="">
                    <input type="text" class="comment-box" placeholder="Add a comment">
                    <button class="comment-btn">post</button>
                </div>
            </div>`).slice(0, num_stat).join('')}`;

        if (status_wrapper && posts) {
            status_wrapper.classList.remove("loading");
            status_wrapper.innerHTML = status_cards;
            posts.innerHTML = post_cards;
        }
    });




