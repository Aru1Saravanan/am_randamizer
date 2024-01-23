const API_KEY = 'c06ca1079341f0b62f0141aae3052485'; // Your TMDb API key

const movieTitles = ["Asako 1", "Paprika (2006)", "Captain miller", "Iratta", "Nanpakal Nerathu Mayakkam", "Neru", "Thoovanathumbikal", "The Girl with the Dragon Tattoo", "Salaar: Part 1 – Ceasefire", "Ayyappanum Koshiyum", "2018 (2023)", "Godha", "Anjaam Pathiraa", "Perfect blue", "The big lebowski", "Whiplash", "Sympathy for Lady vengeance", "I origins", "Perfect blue", "Black swan", "Kiki delivery service", "Forest gump", "Dead poet society", "The Truman show", "Barbie", "Past lives", "Jojo rabbit", "La ciénaga", "Bacurao", "Silvia Prieto", "Fantastic Mr. Fox", "The whale", "Locke", "Beau is afraid", "Killing of the sacred deer", "Good time", "Atomic blonde", "Lost in translation", "The killer", "Blue beetle", "500 days of summer", "Call me by your name", "Eternal sunshine of the spotless mind", "Marriage story", "The hunt", "Banshees of inisherin", "No hard feelings", "District 7", "The haindmaiden", "1987", "Talk to me", "The blairewitch project", "Metropolis", "Memoirs of murder", "Decision to leave", "TMNT mutant mayhem", "It lives inside", "Murder on the orient express", "Schindlers list", "Enola holmes"]; // Add all movie titles from your list
const seriesTitles = ["How I met your mother", "schitt's creek", "Stranger things", "Sex education", "Grey's anatomy", "The big bang theory", "Game of thrones", "The mandalorian", "The office", "Money heist", "The breaking bad", "The simpsons", "Rick and morty", "Bojack horseman", "The boys", "Invincible", "Dexter", "peaky blinders", "Narcos", "squid games", "modern family"]; // Add all series titles from your list
const animeTitles = ["Jujutsu Kaisen", "One piece", "Hunter × Hunter", "Avatar the last airbender", "Naruto shippuden", "Good night world", "Mashle: Magic and Muscles"]; // Add all anime titles from your list

let lastShownMovieIndex = -1;
let lastShownSeriesIndex = -1;
let lastShownAnimeIndex = -1;

async function fetchMediaDetails(title, type) {
    const query = encodeURIComponent(title);
    const url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${query}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results[0]; // Assuming the first result is the most relevant
}

function getRandomIndex(titles, lastIndex) {
    if (titles.length === 1) return 0; // Only one item in the list
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * titles.length);
    } while (newIndex === lastIndex);
    return newIndex;
}

async function getRandomMedia(titles, type, containerId, lastShownIndex) {
    const randomIndex = getRandomIndex(titles, lastShownIndex);
    const media = await fetchMediaDetails(titles[randomIndex], type);
    if (media) {
        document.getElementById(containerId).innerHTML = `
            <h3>${media.title || media.name}</h3>
            <img src="https://image.tmdb.org/t/p/w500${media.poster_path}" alt="${media.title}">
            <p>Release Date: ${media.release_date || media.first_air_date}</p>
            <p>Rating: ${media.vote_average}/10</p>
            <p>${media.overview}</p>
        `;
    }
    return randomIndex; // Return the index of the shown media
}

document.getElementById('getMovieBtn').addEventListener('click', async () => {
    lastShownMovieIndex = await getRandomMedia(movieTitles, 'movie', 'movieContainer', lastShownMovieIndex);
});
document.getElementById('getSeriesBtn').addEventListener('click', async () => {
    lastShownSeriesIndex = await getRandomMedia(seriesTitles, 'tv', 'seriesContainer', lastShownSeriesIndex);
});
document.getElementById('getAnimeBtn').addEventListener('click', async () => {
    lastShownAnimeIndex = await getRandomMedia(animeTitles, 'tv', 'animeContainer', lastShownAnimeIndex);
});


