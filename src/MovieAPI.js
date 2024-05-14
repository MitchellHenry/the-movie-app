export const MOVIE_API = {
        API_KEY: "&api_key=4480cbe567977cab8a3fb6a146ad0137",
        POSTER_PATH:  "https://image.tmdb.org/t/p/w500/",
        API_PATH: "https://api.themoviedb.org/3/",
        API_LANGUAGE: "language=en-US",
        API_PAGE: "&page=",
        API_LOGO_PATH: "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
    }

//Get Movies by specific type ... Trending etc
export async function getMovies(searchType, pageStart, pages, type, genreID)
{
    let genreParameter = "";
    let typeParameter = "";//Incase isn't used
    if(type != undefined)
    {
        typeParameter = "/" + type;
    }
    if (genreID !== null && genreID !== undefined)
    {
        genreParameter = "&with_genres=" + genreID.toString();
    }
    //let maxPages = Number.MAX_VALUE;
    let movies = [];
    for (let currentPage = pageStart; currentPage < (pageStart + pages); currentPage++) {
        let url = MOVIE_API.API_PATH + searchType + typeParameter + "?" + MOVIE_API.API_LANGUAGE + genreParameter + MOVIE_API.API_PAGE + currentPage + MOVIE_API.API_KEY;
        let fetchMoviesData = await fetch(url)     
        let movieData = await fetchMoviesData.json();
        
        movies = movies.concat(movieData.results);
        // if(pages > parseInt(movieData.total_pages))
        // {
        //   pages = maxPages + 1;  //Incase the number of pages requested does not meet the number the API would provide.
        //                          //20 Movies per page.
        // }
    }
    return movies
}

//Get Movie by search query parameter
export async function searchMovies(pageStart, pages, query)
{
    let queryParameter = "";
    queryParameter="query="
    let queryArray = query.split(/(\s+)/);
    (queryArray).forEach(string => {
        queryParameter += string + "+"
    });
    queryParameter = queryParameter.substring(0, queryParameter.length - 1);
    //let maxPages = Number.MAX_VALUE;
    let movies = [];
    for (let currentPage = pageStart; currentPage < (pageStart + pages); currentPage++) {
        let url = MOVIE_API.API_PATH + "search/movie?" + queryParameter + "&" + MOVIE_API.API_LANGUAGE + MOVIE_API.API_PAGE + currentPage + MOVIE_API.API_KEY;
        let fetchMoviesData = await fetch(url)     
        let movieData = await fetchMoviesData.json();
        movies = movies.concat(movieData.results);
        // if(pages > parseInt(movieData.total_pages))
        // {
        //   pages = maxPages + 1;  //Incase the number of pages requested does not meet the number the API would provide.
        //                          //20 Movies per page.
        // }
    }
    return movies
}

//Get all filter by Generes
export async function getGenres()
{
    let url = MOVIE_API.API_PATH + "genre/movie/list?" + MOVIE_API.API_LANGUAGE + MOVIE_API.API_KEY;
    let fetchGenres = await fetch(url);     
    let genreData = await fetchGenres.json();
    return genreData.genres;
}


//Get details on specific Movie
export async function getMovieDetail(id)
{
    let url = MOVIE_API.API_PATH + "movie/" + id + "?" + MOVIE_API.API_LANGUAGE + MOVIE_API.API_KEY;
    let getDetails = await fetch(url);     
    let MovieData = await getDetails.json();
    return MovieData;
}