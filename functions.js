//funcion para 
export default {

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
        parent.appendChild(element);
    },
    filterMoviesByUserId(movies, userId) {
        const moviesByUserId = []
        movies.forEach(movie => { if (movie.userId == userId) { moviesByUserId.push(movie)} })
        return moviesByUserId
    },
    filterByDate(movies, fromDate, toDate) {
        const fromDateMs = new Date(fromDate).getTime()
        const toDateMs = new Date(toDate).getTime()
        let watchedMs;
        const moviesWatches = []
        movies.forEach((movie) => {
            watchedMs = new Date(movie.watched.split(" ")[0]).getTime()
            if (fromDateMs <= watchedMs && watchedMs <= toDateMs) {
                moviesWatches.push(movie)
            }
        })
        return moviesWatches

    },
    fitlterByRate(movies, rate){
        const filteredRate = []
        movies.forEach(movie => { if (Math.trunc(movie.rate) == Math.trunc(rate)) { filteredRate.push(movie)} }) 
        return filteredRate
    }

    
}

