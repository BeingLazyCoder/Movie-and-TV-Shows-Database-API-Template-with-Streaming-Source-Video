const API_KEY = '73da3c2a52ca1beaa0d9360994a2d8a2';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

// Get the movie ID from the URL
const movieId = new URLSearchParams(window.location.search).get('id');

// Fetch movie details and display them
async function fetchMovieDetails() {
    try {
        const response = await fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movie = await response.json();
        displayMovieDetails(movie);
        document.title = `${movie.title} - DooStream`; // Set page title to movie title
    } catch (error) {
        console.error('Error fetching movie details:', error);
        displayErrorMessage();
    }
}

// Display movie details
function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movie-details');
    
    const moviePoster = movie.poster_path
        ? `${IMG_PATH}${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';

    movieDetailsContainer.innerHTML = `
        <img src="${moviePoster}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
        <p><strong>Language:</strong> ${movie.original_language.toUpperCase()}</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
    `;

    // Embed the video trailer (assuming movie ID corresponds to an available video)
    const videoEmbedUrl = `https://vidsrc.dev/embed/movie/${movieId}`;
    document.getElementById('video-embed').src = videoEmbedUrl;
}

// Display error message if fetching fails
function displayErrorMessage() {
    const movieDetailsContainer = document.getElementById('movie-details');
    movieDetailsContainer.innerHTML = `
        <h2>Error loading movie details. Please try again later.</h2>
    `;
}

// Start fetching movie details
fetchMovieDetails();
