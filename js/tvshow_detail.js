const API_KEY = '73da3c2a52ca1beaa0d9360994a2d8a2';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

// Get the TV show ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const tvShowId = urlParams.get('id');

// Fetch TV show details
fetchTvShowDetails(tvShowId);

function fetchTvShowDetails(id) {
    fetch(`${API_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(tvShow => {
            displayTvShowDetails(tvShow);
            document.title = `${tvShow.name} - DooStream`; // Set page title to TV show name
        })
        .catch(error => console.error('Error fetching TV show details:', error));
}

// Display TV show details
function displayTvShowDetails(tvShow) {
    const tvShowDetailsContainer = document.getElementById('tvshow-details');

    const tvShowPoster = tvShow.poster_path
        ? `${IMG_PATH}${tvShow.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';

    const tvShowDetails = `
        <img src="${tvShowPoster}" alt="${tvShow.name}" loading="lazy">
        <h2>${tvShow.name}</h2>
        <p><strong>First Air Date:</strong> ${tvShow.first_air_date}</p>
        <p><strong>Seasons:</strong> ${tvShow.number_of_seasons}</p>
        <p><strong>Episodes:</strong> ${tvShow.number_of_episodes}</p>
        <p><strong>Language:</strong> ${tvShow.original_language.toUpperCase()}</p>
        <p><strong>Overview:</strong> ${tvShow.overview || 'No overview available.'}</p>
    `;

    tvShowDetailsContainer.innerHTML = tvShowDetails;

    // Embed the video trailer (assuming tv show ID corresponds to an available video in the service)
    const videoEmbedUrl = `https://vidsrc.dev/embed/tv/${tvShowId}/1/1`; // Embed first episode as example
    document.getElementById('video-embed').src = videoEmbedUrl;
}
