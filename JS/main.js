const showGames = document.getElementById('games')
const links = document.querySelectorAll('.nav-link')
const all = document.querySelector('.all')
const details = document.querySelector('.details')
const btn = document.querySelector('.btn-close')

async function getData(category = 'mmorpg') {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2f3263aed6msh2c58fbca2128dcdp14e7d5jsn1803ebab0f71',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    const result = await response.json();
    display(result)
}

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (e) => {
        getData(e.target.innerHTML)
        // links[i].classList.add('active')
    })
}

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
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
            all.classList.add('d-none')
            details.classList.remove('d-none')
        })
    }
}

btn.addEventListener('click', () => {
    all.classList.remove('d-none')
    details.classList.add('d-none')
})

getData();
