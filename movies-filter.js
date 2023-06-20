import functions from "./functions.js";

document.addEventListener("DOMContentLoaded", (e) => {
    // url de las APIS
    const USERS_API =
        "https://my-json-server.typicode.com/oconsl/json-server/users";
    const MOVIES_API =
        "https://my-json-server.typicode.com/oconsl/json-server/movies";
    

    // SELECTORES
    const infoMovie = document.querySelector(".infoMovie")
    const inputRate = document.querySelector("inputRate")
    const button = document.querySelector("button")
    const inputFromDate = document.querySelector(".inputFromDate")

    // FUNCIONES
    

    button.addEventListener("click", (e)=>{
        e.preventDefault()
        console.log(inputFromDate.value)
        
    })

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
                console.log(filterMovies({movies: movies, fromDate: "2020-10-06", toDate: "2024-04-01" }))
                //console.log(new Date("2023-06-20").getTime())
                // ms de hoy  1687219200000
                // ms de 1970 1687240448410













             }
             ))
        .catch((error) => console.log(error));

    // FUNCION: filterMovies

    function filterMovies({ users, movies, userId = null, fromDate = null, toDate = null, rate = null }) {
        //filtrado por usuarios
        const userFind = []
        if (userId) { movies.forEach(movie => { if (movie.userId == userId) { userFind.push(movie)} }) }
        
        //filtrado por calificacion
        const filteredRate = [];
        if (rate) {  
            movies.forEach(movie => { if (Math.trunc(movie.rate) == Math.trunc(rate)) { filteredRate.push(movie)} }) }

        //filtrado por fecha HACER ESTO EL MARTES
       /*  const filteredDate = []
        if (fromDate){     
            movies.forEach((movie, index )=>{ 
                let watchedMs = new Date(movies[index].watched.split(" ")[index])
                let fromDateMs = new Date(fromDate)

                if (watched >= fromDate) { filteredDate.push(movie)} }) 
        }
        return filteredDate */
        if(fromDate && toDate) {
            const moviesWatches = functions.filteredDate(movies, fromDate, toDate)
            return moviesWatches
    
        }



        
        
    } 
    
   

    


    /* Nombre de función y parámetros necesarios:
filterMovies({ users, movies, userId, fromDate, toDate, rate });
Cada objeto del arreglo debe tener la siguiente estructura:
{
id: user.id,
username: user.username.
email: user.email,
fullAddress: `${user.address.street} - ${user.address.city}`
company: user.company.name,
movie: movie.title,
rate: movie.rate
} */
});
