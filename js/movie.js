const API_KEY = '73da3c2a52ca1beaa0d9360994a2d8a2';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
let currentPageMovie = 1;

function displayMovies(type, containerId, page = 1) {
    const url = `${API_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            data.results.forEach(movie => {
                const movieCard = `
                <div class="movie-item" data-id="${movie.id}" data-type="movie">
                    <img src="${IMG_PATH}${movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                </div>`;
                container.innerHTML += movieCard;
            });

            document.querySelectorAll('.movie-item').forEach(item => {
                item.addEventListener('click', () => {
                    const id = item.getAttribute('data-id');
                    window.location.href = `movie_detail.html?id=${id}`;
                });
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    displayMovies('popular', 'popular-movies-list', currentPageMovie);
    document.getElementById('load-more-movies').addEventListener('click', () => {
        currentPageMovie++;
        displayMovies('popular', 'popular-movies-list', currentPageMovie);
    });
});
