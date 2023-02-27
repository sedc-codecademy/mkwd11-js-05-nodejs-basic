let colors = require("colors");

console.log("Hello from Node js =)");

const sumOfNumbers = (numberOne, numberTwo) => numberOne + numberTwo;

console.log(sumOfNumbers(20, 55));

console.log('hello'.green);

let greetings = "Hello from G11, today we learn about node js. =)";

console.log(greetings.red.underline.bgYellow);


// RECAP 

console.log("*** RECAP ***")
// node --watch index.js => Pri sekoe klikanje save, avtomatski ke ni se runuva komandata node index.js
// ctrl + c ke go prekine ovoj proces =)

//REST OPERATOR ... => Reprezentira neopredelen broj na parametri vo ovaa funkcija
const sumNumbers = (...args) => { //ovie ke bidat vo NIZA
    console.log(args);
    let sum = 0;

    for(let number of args) sum += number

    console.log(sum)
}

sumNumbers(1); // 1
sumNumbers(1 , 2 , 3); // 6

const fullName = (firstName, lastName, ...restParameters) => {
    console.log(firstName, lastName);

    console.log(restParameters);
}

fullName("John", "Doe");
fullName("Bob", "Bobski", 29, true, "has car", "has pet");

// SPREAD ... => "shirenje" vrednostite na objektite i nizite, isto taka 
// da pravime kopii na nizi i objekti;

let fruits = ["Banana", "Stawberries", "Apple"];

let secondFruits = fruits; //istata referenca vo memorija kako fruits

console.log("Check fruits arrays", secondFruits === fruits);
console.log("Fruits #1:", fruits);
console.log("Second Fruits #1:", secondFruits);
secondFruits.push("Melon");

console.log("Fruits #2:", fruits);
console.log("Second Fruits #2:", secondFruits);

let thirdFruits = [...fruits]; //napravivme kopija od fruits varijablata
//i referencirame kon drugo mesto vo memorija =)

console.log("Fruits #3:", fruits);
console.log("Third Fruits #3:", thirdFruits);
thirdFruits.push("Watermelon")
console.log("***** *****");
console.log("Fruits #4:", fruits);
console.log("Third Fruits #4:", thirdFruits);

let maleNames = ["Bob", "John", "Tom"];
let femaleNames = ["Angelina", "Jully"];

let names = [...maleNames, ...femaleNames] // gi sodrzhi vrednostite i od maleNames & femaleNames

console.log("*** ***");
console.log(names);
console.log("*** ***");

let personOne = {
    name: "Bob"
}

let personTwo = personOne
console.log("Person one", personOne)
console.log("Person two", personTwo)
personTwo.lastName = "Bobski"

console.log("Person one #2", personOne)
console.log("Person two #2", personTwo)

let personThree = {
    ...personOne
}
personThree.age = 28;
console.log("*** ***");
console.log("Person one #3", personOne);
console.log("Person two #3", personThree);

console.log("*** ***");

let movieOne = {
    name: "Harry Potter"
}

let movieTwo = {
    name: "Top Gun"
}

let movie = {
    ...movieOne,
    ...movieTwo
};

console.log(movie);

// FILTER
const numbers = [2,51,2,56,7,8,10];

function returnEvenNumbers(arrayOfNumbers){
 let evenNumbers =  arrayOfNumbers.filter((number) => {
        // number argumentot e sekoj element od momentalnata iteracija
        
        // if(number % 2 === 0 ){
        //     return number
        // }

        return number % 2 === 0
    })

    console.log(evenNumbers)
}

returnEvenNumbers(numbers)