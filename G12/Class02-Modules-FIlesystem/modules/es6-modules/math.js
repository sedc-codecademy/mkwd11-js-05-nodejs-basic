const addNumbers = (numOne, numTwo) => numOne + numTwo;
const multiplyNumbers = (numOne, numTwo) => numOne * numTwo;

// Named exports have the keyword "export" before their declaration
export const subtractNumbers = (numOne, numTwo) => numOne - numTwo;
export const divideNumbers = (numOne, numTwo) => numOne / numTwo;

// Default es6 export (only one per module)
export default { addNumbers, multiplyNumbers };
