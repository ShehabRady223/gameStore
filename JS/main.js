const showGames = document.getElementById('games')
const links = document.querySelectorAll('.nav-link')
const all = document.querySelector('.all')
const details = document.querySelector('.details')
const loading = document.querySelector(".loader");

getData();

async function getData(category = 'mmorpg') {
    loading.classList.remove('d-none')
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2f3263aed6msh2c58fbca2128dcdp14e7d5jsn1803ebab0f71',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    const result = await response.json();
    loading.classList.add('d-none')
    display(result)
}

links.forEach((link) => {
    link.addEventListener('click', (e) => {
        getData(e.target.innerHTML)
        links.forEach(l => l.classList.remove('active'))
        link.classList.add('active');
    })
})

async function display(games) {
    let container = ''
    for (let i = 0; i < games.length; i++) {
        container += `
                <div class="col-md-4">
                    <div class="card" date-id='${games[i].id}'>
                        <img class="card-img-top" src="${games[i].thumbnail}" alt="Title" />
                        <div class="card-body">
                            <h4 class="card-title d-flex justify-content-between">
                            ${games[i].title.split(' ').slice(0, 2).join(' ')}
                                <button class="btn btn-primary">Free</button>
                            </h4>
                            <p class="card-text text-center opacity-50">
                                ${games[i].short_description}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <p>${games[i].genre}</p>
                            <p>${games[i].platform}</p>
                        </div>
                    </div>
                </div>
        `
    }
    showGames.innerHTML = container
    const cards = document.querySelectorAll('.card')
    cards.forEach((item) => {
        item.addEventListener('click', () => {
            getGame(item.attributes[1].value)
        })
    })
}

async function getGame(id) {
    loading.classList.remove('d-none')
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2f3263aed6msh2c58fbca2128dcdp14e7d5jsn1803ebab0f71',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    const result = await response.json();
    loading.classList.add('d-none')
    displayDetails(result)
}

function displayDetails(item) {
    details.innerHTML = `
            <div class="container">
            <header class="hstack justify-content-between">
                <h1 class="text-center h3 py-4">Details Game</h1>
                <button class="btn-close btn-close-white"></button>
            </header>
            <div class="row g-4">
                <div class="col-md-4">
                    <img src="${item.thumbnail}" class="w-100" alt="image details">
                </div>
                <div class="col-md-8">
                    <h3>Title: ${item.title}</h3>
                    <p>Category: <span class="badge text-bg-info"> ${item.genre}</span> </p>
                    <p>Platform: <span class="badge text-bg-info"> ${item.platform}</span> </p>
                    <p>Status: <span class="badge text-bg-info"> ${item.status}</span> </p>
                    <p class="small">${item.description}</p>
                    <a class="btn btn-outline-warning" target="_blank"
                        href="${item.game_url}">Show Game</a>
                </div>
            </div>
        </div>
    `
    const btn = document.querySelector('.btn-close')
    btn.addEventListener('click', () => {
        all.classList.remove('d-none')
        details.classList.add('d-none')
    })
    details.classList.remove('d-none')
    all.classList.add('d-none')
}
