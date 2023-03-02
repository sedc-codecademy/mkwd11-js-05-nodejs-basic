// const calculator = require("./my_modules/calculationModule"); // #1. Single export require.
const fullNameModule = require("./my_modules/text");
const calculationModule = require("./my_modules/calculationModule"); // #2. Multimple export require.
const {movie, drinks} = require("./my_modules/random");


console.log(calculationModule)
// let calculationOne = calculator("*", 10, 3); // #1. Single function usage.
// console.log("Result is:", calculationOne);

let calculationTwo =  calculationModule.calculator("+", 10, 22); // #2. Multiple export usage
console.log(calculationTwo);
console.log("**** ****");

console.log(fullNameModule("John", "Doe"))

console.log("**** ****");
console.log(drinks);
let myMovie = new movie();
console.log(myMovie)