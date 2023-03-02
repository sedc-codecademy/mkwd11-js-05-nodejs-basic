const calculator = (operator, numberOne, numberTwo) => {
    switch(operator){
        case "*":
            return numberOne * numberTwo;
        case "+":
            let result = numberOne + numberTwo;
            return result;
        default:
            break;
    }  
};


const isEven = (number) => {
    if(number % 2 === 0){
        return `${number} is even`
    }
    else {
        return `${number} is odd`
    }
}

// ** #1. Single export syntax
// module.exports = calculator;

// module.exports = isEven; //dont do it 

// ** Multiple exports syntax
module.exports = {
    calculator: calculator,
    isEven: isEven
}

// ** Same as above but shorter
/**
 * If key and values names are matching
 * we can write just the name =)
 */
// module.exports = {
//     calculator,
//     isEven
// }