export const MOVIE_API = {
        API_KEY: "&api_key=4480cbe567977cab8a3fb6a146ad0137",
        POSTER_PATH:  "https://image.tmdb.org/t/p/w500/",
        API_PATH: "https://api.themoviedb.org/3/movie/",
        API_LANGUAGE: "?language=en-US",
        API_PAGE: "&page=",
        API_LOGO_PATH: "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
    }
export async function getMovies(type, pages)
{
    let maxPages = Number.MAX_VALUE;
    let movies = [];
    for (let currentPage = 1; currentPage < pages + 1; currentPage++) {
        let url = MOVIE_API.API_PATH + type + MOVIE_API.API_LANGUAGE + currentPage + MOVIE_API.API_KEY;
        let fetchMoviesData = await fetch(url)     
        let movieData = await fetchMoviesData.json();
        
        movies = movies.concat(movieData.results);
        if(pages > parseInt(movieData.total_pages))
        {
          pages = maxPages + 1;  //Incase the number of pages requested does not meet the number the API would provide.
                                 //20 Movies per page.
        }
    }
    return movies
    
}