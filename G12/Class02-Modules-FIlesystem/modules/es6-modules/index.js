// Default es6 imports
import math from "./math.js";

// Importing named exports ( always need to use brackets )
import { subtractNumbers, divideNumbers } from "./math.js";

console.log(math);
console.log(subtractNumbers, divideNumbers);

console.log(math.addNumbers(3, 4));
console.log(math.multiplyNumbers(3, 4));
console.log(subtractNumbers(3, 4));
console.log(divideNumbers(3, 4));
