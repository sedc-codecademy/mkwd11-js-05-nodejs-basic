const { isEmail } = require("validator");

console.log("from node js");

const fakeEmail = "asdasdsd@gmail.com";

const isEmailValid = isEmail(fakeEmail);

console.log(`Email is valid: ${isEmailValid}`);

const addTwoNums = (numOne, numTwo) => {
  return numOne + numTwo;
};

console.log(addTwoNums(10, 2));
console.log(addTwoNums(10, 29));
console.log(addTwoNums(40, 500));

// npm init = step by step guide for creating node project
// npm init -y = automatic creation of node project
// ls = shows list of all files/folders in terminal location
// cd = changes directory of terminal
// mkdir = makes one or more folders
// touch = makes one or more files
// up arrow on keyboard = loads previous terminal command
