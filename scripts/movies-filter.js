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
    const result = document.querySelector(".result")
    const fragment = document.createDocumentFragment()

    // Utilizacion de fetch para la obtención asincronica de los datos
    fetch(MOVIES_API)
        .then((response) => response.json())
        .then((movies) => {
            //Creación de etiquetas con los datos de las peliculas y le asigno el elemento conteiner para poder manipular cada pelicula
            functions.createTags(movies, fragment)
            infoMovie.appendChild(fragment)
            return movies
        })
        .then(movies => fetch(USERS_API)
            .then(response => response.json())
            .then(users => {
                button.addEventListener("click", (e) => {
                    e.preventDefault()

                    // Utilización de la función principal
                    const searchResult = functions.filterMovies({ users: users, movies: movies, userId: inputUserId.value, fromDate: inputFromDate.value, toDate: inputToDate.value, rate: inputRate.value })

                    //Reinicio el contenido para no tener que recargar la pagina por cada busqueda 
                    result.textContent = ""
                    infoMovie.textContent = ""
                    functions.createTags(movies, fragment)
                    infoMovie.appendChild(fragment)
                    const containers = document.querySelectorAll('.container');
                    let title;
                    let movieExists;

                    //En caso de que se ingrese un userId y exista
                    if (inputUserId.value && searchResult.length > 0) {
                        //Creación de etiquetas para enviar la respuesta
                        let userName = functions.createAndAppendElement("h3", result, null, `Nombre del usuario: ${searchResult[0].username}`)
                        let email = functions.createAndAppendElement("h3", result, null, `Email: ${searchResult[0].email}`)
                        let fullAdress = functions.createAndAppendElement("h3", result, null, `Dirección: ${searchResult[0].fullAddress}`)

                        //Consulto de si hay mas de una pelicula vista por el mismo usuario y remuevo las que no haya visto
                        if (searchResult.length > 1) {
                            containers.forEach((container) => {
                                title = container.querySelector('h2').textContent;
                                movieExists = searchResult.some((user) => user.movie == title);
                                if (!movieExists) {
                                    container.remove();
                                }
                            });
                        } else {
                            //si solo hay una pelicula vista la dejo y elimino el resto
                            containers.forEach((container) => {
                                title = container.querySelector('h2').textContent;
                                movieExists = searchResult.some((user) => user.movie == title);
                                if (!movieExists) {
                                    container.remove();
                                }
                            });
                        }
                    }
                    //Mensaje en caso de q se ingrese un userId pero con los otros filtros no haya coincidencia
                    if (inputUserId.value && searchResult.length == 0) {
                        functions.createAndAppendElement("h3", result, null, `Lamentablemante no encontramos coincidencias entre el usuario y los filtros ingresados`)
                        
                    }
                    //si no se igresa userId solo se mostrarn las peliculas que cumplan con el resto de filtros
                    if (!inputUserId.value && searchResult.length > 0) {
                        containers.forEach((container) => {
                            title = container.querySelector('h2').textContent;
                            movieExists = searchResult.some((movie) => movie.title === title);
                            if (!movieExists) {
                                container.remove();
                            }
                        })
                    }
                    if (searchResult.length == 0) {
                        functions.createAndAppendElement("h3", result, null, `No se encontraron peliculas que cumplan los filtros ingresados`)
                        containers.forEach(c => { c.remove() })
                    }
                })
            }
            ))
        .catch((error) => console.log(error));
});
