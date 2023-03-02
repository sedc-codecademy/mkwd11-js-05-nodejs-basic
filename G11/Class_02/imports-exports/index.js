// const moviePrinting = require("./movies") // Common JS import (require)

// #1 Default import and usage for default exporting only 1 value
// import moviePrinting from "./movies.js"; // ES6 JS IMPORT (more used); DEFAULT IMPORT

// const movies = 
// [
//     {name: "John Wick", director: "Director", category: "Action"},
//     {name: "The Hobbit", director: "Director 2", category: "Fantasy"}
// ];

// moviePrinting(movies);


//  #2 Default import multiple values
import moviesModule from "./movies.js";

// console.log(moviesModule) //its object that we exported with 2 functions and 1 array

const movies = moviesModule.moviesList;

moviesModule.printMovies(movies);
console.log("*** ***");

let filteredMovies = moviesModule.moviesByCategory(movies, "Fantasy");
console.log(filteredMovies);


// NAMED IMPORTS;
console.log("**** NAMED IMPORTS ****")
import {songs, fehrenToCel, Song} from "./my_service.js";

console.log(songs)

console.log(fehrenToCel(50))

let songTwo = new Song("Song name", "Song Author");

console.log(songTwo)