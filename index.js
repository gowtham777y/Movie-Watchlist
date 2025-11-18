const baseURL = "http://www.omdbapi.com/?i=tt3896198&apikey=5768c681"

const searchMovie = document.getElementById("search-movie")
const movieList = document.getElementById("movie-list")

let movieArray = []
let watchListMovies = []

searchMovie.addEventListener("submit",(e)=>{
    e.preventDefault()
    const formData = new FormData(searchMovie)
    const movieTitle = formData.get("movie-title")
    console.log(movieTitle)
    if (movieTitle === "" || movieTitle === null){
        movieList.innerHTML = `<p id="placeholder">🎬 Start Exploring</p>`
    } else {
        getMoviesList(movieTitle)
    }
})

async function getMoviesList(title){
    const response = await fetch(baseURL+`&s=${title}`)
    if(!response.ok){
        console.log(`HTTP Error! status ${response.status}`)
    }
    const data = await response.json()
    movieArray = data.Search;
    renderMovies(movieArray)
}

function renderMovies(movieArray){
    const innerHTML = movieArray.map(movie => {
        return `
            <div class="movie">
                <img class="image" src="${movie.Poster}">
                <div>
                    <h2 class="movie-name">${movie.Title}</h2>
                    <div class="movie-info">
                        <p>${movie.Year}</p>
                        <p>Action, Drama, Scifi</p>
                        <button data-imdbID="${movie.imdbID}">+ Wishlist</button>
                    </div>
                    <p class="movie-description">A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
                </div>
            </div>
        `
    }).join('')
    movieList.innerHTML = innerHTML
}

document.addEventListener("click",function(e){
    if (e.target.dataset.imdbID){
        watchListMovies.push(movieArray.filter(function(movie){
            return movie.imdbID === e.target.dataset.imdbID
        }))
        localStorage.setItem("movies",watchListMovies)
    }
})

function renderWatchList(){
    console.log(watchListMovies)
    const innerHTML = watchListMovies.map(movie => {
        return `
            <div class="movie">
                <img class="image" src="${movie.Poster}">
                <div>
                    <h2 class="movie-name">${movie.Title}</h2>
                    <div class="movie-info">
                        <p>${movie.Year}</p>
                        <p>Action, Drama, Scifi</p>
                        <button data-imdbID="${movie.imdbID}">+ Wishlist</button>
                    </div>
                    <p class="movie-description">A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
                </div>
            </div>
        `
    }).join('')
    document.getElementById("watchlist").innerHTML = innerHTML
}

renderWatchList()