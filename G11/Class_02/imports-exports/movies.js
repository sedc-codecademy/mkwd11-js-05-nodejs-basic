const movies = 
[
    {name: "John Wick", director: "Director", category: "Action"},
    {name: "The Hobbit", director: "Director 2", category: "Fantasy"},
    {name: "Harry Potter", director: "Director 2", category: "Fantasy"},
    {name: "Ace Venture", director: "Director 3", category: "Comedy"}

]

const printMovies = (moviesList) => {
    moviesList.forEach((movie) => {
        console.log(`Movie name: ${movie.name}, directed by: ${movie.director}`)
    })
};

const moviesByCategory =(moviesList, category) => {
    const filteredMovies = moviesList.filter((movie) => movie.category === category);

    return filteredMovies
}

// module.exports = printMovies // common js export

// ES6 syntax for exporting =) (more used)
//  export default printMovies // #1 DEFAULT EXPORT only one value

// #2 Multiple default exports
export default {
    printMovies: printMovies,
    moviesByCategory: moviesByCategory,
    moviesList: movies
}