const API_KEY = '73da3c2a52ca1beaa0d9360994a2d8a2';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

// Initial page numbers for Movies and TV Shows
let currentPage = {
    popularMovie: 1,
    topRatedMovie: 1,
    popularTVShow: 1,
    topRatedTVShow: 1
};

// Fetch and display Movies and TV Shows
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplay('movie/popular', 'popular-movies-list', 'popularMovie');
    fetchAndDisplay('movie/top_rated', 'top-rated-movies-list', 'topRatedMovie');
    fetchAndDisplay('tv/popular', 'popular-tvshows-list', 'popularTVShow');
    fetchAndDisplay('tv/top_rated', 'top-rated-tvshows-list', 'topRatedTVShow');
});

// Fetch and display Movies and TV Shows
function fetchAndDisplay(endpoint, containerId, pageKey) {
    const url = `${API_URL}/${endpoint}?api_key=${API_KEY}&page=${currentPage[pageKey]}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayItems(data.results, containerId, endpoint.startsWith('movie')))
        .catch(error => console.error(`Error fetching ${endpoint}:`, error));
}

// Display items in the grid (for both movies and TV shows)
function displayItems(items, containerId, isMovie) {
    const container = document.getElementById(containerId);
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        const card = createCard(item, isMovie);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
    addClickEventToCards(containerId, isMovie); // Attach click event
}

// Create a card element for movies or TV shows
function createCard(item, isMovie) {
    const card = document.createElement('div');
    card.className = 'movie-item';
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-type', isMovie ? 'movie' : 'tv');

    const img = document.createElement('img');
    img.src = `${IMG_PATH}${item.poster_path}`;
    img.alt = isMovie ? item.title : item.name;

    const title = document.createElement('h3');
    title.textContent = isMovie ? item.title : item.name;

    card.appendChild(img);
    card.appendChild(title);
    return card;
}

// Add click events to cards
function addClickEventToCards(containerId, isMovie) {
    document.querySelectorAll(`#${containerId} .movie-item`).forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            const url = isMovie ? `movie_detail.html?id=${id}` : `tvshow_detail.html?id=${id}`;
            window.location.href = url;
        });
    });
}

// Live Search Functionality
document.getElementById('search-bar').addEventListener('input', function () {
    const query = this.value;
    if (query) {
        fetchSearchResults(query);
    } else {
        document.getElementById('search-results').style.display = 'none';
    }
});

function fetchSearchResults(query) {
    const url = `${API_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResults(data.results))
        .catch(error => console.error('Error fetching search results:', error));
}

function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('search-results-list');
    searchResultsContainer.innerHTML = ''; // Clear previous results

    if (results.length > 0) {
        const fragment = document.createDocumentFragment();
        results.forEach(result => {
            const card = createCard(result, result.media_type === 'movie');
            fragment.appendChild(card);
        });

        searchResultsContainer.appendChild(fragment);
        document.getElementById('search-results').style.display = 'block';
        addClickEventToCards('search-results-list', true); // Handle events for search results
    } else {
        document.getElementById('search-results').style.display = 'none';
    }
}

// Load More Button functionality
const loadMoreButtons = {
    'load-more-movies': 'movie/popular',
    'load-more-top-rated-movies': 'movie/top_rated',
    'load-more-tvshows': 'tv/popular',
    'load-more-top-rated-tvshows': 'tv/top_rated'
};

Object.keys(loadMoreButtons).forEach(buttonId => {
    document.getElementById(buttonId).addEventListener('click', () => {
        const type = buttonId.includes('movies') ? 'movie' : 'tv';
        currentPage[`${type}Movie`] = (type === 'movie' ? currentPage.popularMovie : currentPage.popularTVShow) + 1;
        fetchAndDisplay(loadMoreButtons[buttonId], buttonId.replace('load-more-', ''), `${type}Movie`);
    });
});
