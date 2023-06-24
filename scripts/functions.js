//funcion para 
export default {
    //Funcion para crear elementos en mi html 
    createAndAppendElement(tag, parent, attributes, text) {
        let element = document.createElement(tag);
        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
        if (text) {
            element.appendChild(document.createTextNode(text));
        }
        if(parent){parent.appendChild(element)}
    },

    createTags(movies, fragment) {

        movies.forEach((movie) => {
            const container = document.createElement("div");
            container.classList.add("container");
            const title = this.createAndAppendElement("h2", container, null, `${movie.title}`);
            const genre = this.createAndAppendElement("p", container, null, `Género: ${movie.genre}`);
            const rate = this.createAndAppendElement("p", container, null, `Puntuación: ${movie.rate}`);
            const image = this.createAndAppendElement("img", container, { src: movie.image });
            fragment.appendChild(container);
        });
    },

    filterMoviesByUserId(movies, userId) {
        const moviesByUserId = []
        movies.forEach(movie => { if (movie.userId == userId) { moviesByUserId.push(movie)} })
        return moviesByUserId
    },

    filterByDate({movies, fromDate = null, toDate = null}) {
        const fromDateMs = new Date(fromDate).getTime()
        const toDateMs = new Date(toDate).getTime()
        let watchedMs;
        const moviesWatches = []
        movies.forEach((movie) => {
            watchedMs = new Date(movie.watched.split(" ")[0]).getTime()
            if ((fromDateMs <= watchedMs && watchedMs <= toDateMs) || (!fromDate && toDateMs >= watchedMs) || (!toDate && fromDateMs <= watchedMs)) {
                moviesWatches.push(movie)
            }
        
        })
        return moviesWatches
    },

    fitlterByRate(movies, rate){
        let filteredRate = []
        movies.forEach(movie => { if (Math.trunc(movie.rate) >= Math.trunc(rate)) { filteredRate.push(movie)} }) 
        return filteredRate
    },
    filterMovies({ users, movies, userId = null, fromDate = null, toDate = null, rate = null }) {
        //filtrado por calificacion
        let filteredMovies = movies
        if (rate) {
            filteredMovies = this.fitlterByRate(movies, rate)
        }
        //filtrado por fecha 
        if (fromDate || toDate) {
            filteredMovies = this.filterByDate({ movies: filteredMovies, fromDate: fromDate, toDate: toDate })
        }
        //filtrado por usuario
        if (userId) {
            filteredMovies = this.filterMoviesByUserId(filteredMovies, userId)
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
        } else { return filteredMovies }

    }    
}

