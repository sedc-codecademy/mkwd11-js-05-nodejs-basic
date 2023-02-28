

// npm init = step by step guide for creating node project
// npm init -y = automatic creation of node project
// ls = shows list of all files/folders in terminal location
// cd = changes directory of terminal
// mkdir = makes one or more folders
// touch = makes one or more files
// up arrow on keyboard = loads previous terminal command



//ARROW FUNCTION
const someFunction = (a, b) => a + b;

// console.log(someFunction(2, 5));
// console.log(someFunction(5, 7));

// SOME ARRAY
const someArray = [1, 2, 3, 4, 5, 6, 7];

// someArray.forEach(hehe => {
//     someArraySecond.push(hehe);
// })

//SPREAD OPERATOR TO SPREAD THE CONTENTS OF SOME ARRAY INTO NEW ARRAY
someArraySecond = [...someArray];

// someArraySecond.push(10);
// console.log(someArray);
// console.log(someArraySecond);

const someObject = {
    name: 'Ivan',
    lastName: 'Jamandilovski',
    address: {
        street: 'temnica',
        number: null
    }
}
// const secondObject = someObject;
// someObject.name = 'hehe';


//REST OPERATOR TO COPY ALL CONTENTS OF OBJECT IN ANOTHER OBJECT
const secondObject = { ...someObject };

// for (let key in someObject) {
//     // console.log(key);
//     secondObject[key] = someObject[key];
// }

secondObject.address.street = 'denje';
secondObject.name = 'hehe';

console.log(someObject);
console.log(secondObject);


//
// for (let i = 0; i < 100000000; i++) {
//     someArraySecond.push(i);
// }

// const testTime = 'testTime';

// console.time(testTime)
// for (let i = 0; i < someArraySecond.length; i++){
//     someArraySecond[i]++;
// }

// for (let number of someArraySecond){
//     number += 1;
// }
// someArraySecond.forEach(number=>{
//     number++;
// })
// console.timeEnd(testTime)


// for (let i = 0; i < someArray.length; i++) {
//     someArraySecond.push(someArray[i]);
// }


const students = [];
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getOlder() {
        this.age++;
    }
}
students.push(new Student('Ivan', 25));
students.push(new Student('Jovana', 19));
students.push(new Student('Blagoja', 23));
students.push(new Student('Anastasija', 23));
students.push(new Student('Pero', 56));
students.push(new Student('Zoran', 25));
students.push(new Student('Goran', 25));

// const olderThanTwentyFive = students.filter(s => s.age > 25);
// console.log(olderThanTwentyFive);

// const namesOfAllStudents = students.map(student => student.name);
// console.log(namesOfAllStudents);


const namesOfAllStudentsYoungerThan25 = students
    .filter(s => s.age < 25)
    .map(s => s.name);

console.log(namesOfAllStudentsYoungerThan25);

students.sort((a, b) => a.age - b.age)
console.log(students);

// students[1].getOlder();
// students.forEach(student=>student.getOlder());

// students[2].friend = students[0];
// students[0].friend = students[1];
// students[1].friend = students[2];
// students[1].friend = students[0].friend;
// students[1].friend.name = 'Hehe';














