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

// Generic fetch and display function
function fetchAndDisplay(endpoint, containerId, pageKey) {
    const url = `${API_URL}/${endpoint}?api_key=${API_KEY}&page=${currentPage[pageKey]}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayItems(data.results, containerId))
        .catch(error => console.error('Error fetching data:', error));
}

// Display Movies and TV Shows in the grid
function displayItems(items, containerId) {
    const container = document.getElementById(containerId);
    const fragment = document.createDocumentFragment(); // Create a document fragment for performance

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'movie-item';
        card.setAttribute('data-id', item.id);
        card.setAttribute('data-type', item.media_type || 'movie');
        
        const img = document.createElement('img');
        img.src = `${IMG_PATH}${item.poster_path}`;
        img.alt = item.title || item.name;
        
        const title = document.createElement('h3');
        title.textContent = item.title || item.name;

        card.appendChild(img);
        card.appendChild(title);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
    addClickEventToCards(); // Attach click event to each card
}

// Add click event to navigate to detail pages
function addClickEventToCards() {
    document.querySelectorAll('.movie-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            const type = item.getAttribute('data-type');
            const url = type === 'movie' ? `movie_detail.html?id=${id}` : `tvshow_detail.html?id=${id}`;
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
            const card = document.createElement('div');
            card.className = 'movie-item';
            card.setAttribute('data-id', result.id);
            card.setAttribute('data-type', result.media_type);
            
            const img = document.createElement('img');
            img.src = `${IMG_PATH}${result.poster_path}`;
            img.alt = result.title || result.name;

            const title = document.createElement('h3');
            title.textContent = result.title || result.name;

            card.appendChild(img);
            card.appendChild(title);
            fragment.appendChild(card);
        });

        searchResultsContainer.appendChild(fragment);
        document.getElementById('search-results').style.display = 'block';
        addClickEventToCards(); // Add click events to the new search results
    } else {
        document.getElementById('search-results').style.display = 'none';
    }
}

// Load More Button functionality
document.getElementById('load-more-movies').addEventListener('click', () => {
    currentPage.popularMovie++;
    fetchAndDisplay('movie/popular', 'popular-movies-list', 'popularMovie');
});

document.getElementById('load-more-top-rated-movies').addEventListener('click', () => {
    currentPage.topRatedMovie++;
    fetchAndDisplay('movie/top_rated', 'top-rated-movies-list', 'topRatedMovie');
});

document.getElementById('load-more-tvshows').addEventListener('click', () => {
    currentPage.popularTVShow++;
    fetchAndDisplay('tv/popular', 'popular-tvshows-list', 'popularTVShow');
});

document.getElementById('load-more-top-rated-tvshows').addEventListener('click', () => {
    currentPage.topRatedTVShow++;
    fetchAndDisplay('tv/top_rated', 'top-rated-tvshows-list', 'topRatedTVShow');
});
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Process your data here
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
