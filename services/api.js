const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_API_KEY,
};

export default async function fetchMovies({query = '', movieId =  ''}){
    const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${TMDB_CONFIG.API_KEY}&sort_by=popularity.desc&query=${query}` : 
    movieId ? `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`:
    `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&sort_by=popularity.desc`;
    console.log(endpoint);
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            console.error("Fetch failed:", response.status, response.statusText);
            throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data)
        if(movieId){
            return data;
        }
        return data.results;
    } catch (error) {
        console.error("Error during fetchMovies:", error.message);
        throw error;
    }
}


