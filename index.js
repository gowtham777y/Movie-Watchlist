const baseURL = "http://www.omdbapi.com/?i=tt3896198&apikey=5768c681"

const searchMovie = document.getElementById("search-movie")

searchMovie.addEventListener("submit",(e)=>{
    e.preventDefault()
    const formData = new FormData(searchMovie)
    const movieTitle = formData.get("movie-title")
    getMoviesList(movieTitle)
})

async function getMoviesList(title){
    const response = await fetch(baseURL+`&s=${title}`)
    if(!response.ok){
        console.log(`HTTP Error! status ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
}