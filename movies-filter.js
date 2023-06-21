import functions from "./functions.js";

document.addEventListener("DOMContentLoaded", (e) => {
    // url de las APIS
    const USERS_API =
        "https://my-json-server.typicode.com/oconsl/json-server/users";
    const MOVIES_API =
        "https://my-json-server.typicode.com/oconsl/json-server/movies";
    
    // SELECTORES
    const infoMovie = document.querySelector(".infoMovie")
    const inputRate = document.querySelector(".inputRate")
    const inputFromDate = document.querySelector(".inputFromDate")
    const inputToDate = document.querySelector(".inputToDate")
    const inputUserId = document.querySelector(".inputUserId")
    const button = document.querySelector("button")

    fetch(MOVIES_API)
        .then((response) => response.json())
        .then((movies) => {  
            movies.forEach((movie) => {
                const title = functions.createAndAppendElement("h2", infoMovie, null,`${movie.title}`)
                const genre = functions.createAndAppendElement("p", infoMovie, null, `Genero: ${movie.genre}`)
                const rate = functions.createAndAppendElement("p", infoMovie, null, `Puntuación: ${movie.rate}`)
                const image = functions.createAndAppendElement("img", infoMovie, {src: movie.image});
            });
            return movies
        })
        .then(movies=> fetch(USERS_API)
             .then(response => response.json())
             .then(users => {

                button.addEventListener("click", (e)=>{
                    e.preventDefault()
                    console.log(filterMovies({users: users, movies: movies, userId: inputUserId.value, fromDate: inputFromDate.value, toDate: inputToDate.value, rate: inputRate.value}))
                })













             }
             ))
        .catch((error) => console.log(error));

    // FUNCION: filterMovies

    function filterMovies({ users, movies, userId = null, fromDate = null, toDate = null, rate = null }) {
        
        //filtrado por calificacion
        let filteredMovies = movies
        if (rate) {  
            filteredMovies = functions.fitlterByRate(movies, rate)
            }
        
        //filtrado por fecha 
        if(fromDate && toDate) { 
            filteredMovies = functions.filterByDate(filteredMovies, fromDate, toDate)
        }
        
        //filtrado por usuarios
        if (userId) {
            filteredMovies = functions.filterMoviesByUserId(filteredMovies, userId)
            let user = users.find(user => user.id == userId)
            let userData = []
            filteredMovies.forEach(movie => {

                userData.push({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullAddress: `${user.address.street} - ${user.address.city}`,
                    company: user.company.name,
                    movie: movie.title,
                    rate: movie.rate
                })

            })
            return userData
        }else{return filteredMovies}
               
    } 

});
