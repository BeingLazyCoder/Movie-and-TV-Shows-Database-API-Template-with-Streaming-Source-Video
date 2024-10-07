const API_KEY = '73da3c2a52ca1beaa0d9360994a2d8a2';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
let currentPageTVShow = 1;

function displayTvShows(type, containerId, page = 1) {
    const url = `${API_URL}/tv/${type}?api_key=${API_KEY}&language=en-US&page=${page}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            data.results.forEach(tvShow => {
                const tvShowCard = `
                <div class="movie-item" data-id="${tvShow.id}" data-type="tv">
                    <img src="${IMG_PATH}${tvShow.poster_path}" alt="${tvShow.name}">
                    <h3>${tvShow.name}</h3>
                </div>`;
                container.innerHTML += tvShowCard;
            });

            document.querySelectorAll('.movie-item').forEach(item => {
                item.addEventListener('click', () => {
                    const id = item.getAttribute('data-id');
                    window.location.href = `tvshow_detail.html?id=${id}`;
                });
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    displayTvShows('popular', 'popular-tvshows-list', currentPageTVShow);
    document.getElementById('load-more-tvshows').addEventListener('click', () => {
        currentPageTVShow++;
        displayTvShows('popular', 'popular-tvshows-list', currentPageTVShow);
    });
});