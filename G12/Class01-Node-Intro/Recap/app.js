console.log("works");

// Async-Await recap
const fetchPosts = async () => {
  const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await postsRes.json();

  return posts;
};

const fetchTodos = async () => {
  const todosRes = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await todosRes.json();

  return todos;
};

const fetchData = async () => {
  try {
    // Calling async functions in other async functions ( don't forget await )
    const posts = await fetchPosts();
    const todos = await fetchTodos();

    if (!posts) throw new Error("No posts found");

    console.log("From the fetch data function");
    console.log("Todos", todos);
    console.log("Posts", posts);
  } catch (error) {
    console.error(error);
  }
};

// fetchData();

// Destructuring recap

const student = {
  firstName: "John",
  lastName: "Doe",
  age: 35,
  grades: {
    basicHtml: 5,
    basicJs: 3,
    advancedJs: 1,
  },
};

// Destructuring argument in function definition
const printStudentInfo = ({
  firstName,
  lastName,
  age,
  grades: { basicHtml, basicJs, advancedJs },
}) => {
  // Destructuring in function body
  //   const {
  //     firstName,
  //     lastName,
  //     age,
  //     grades: { basicHtml, basicJs, advancedJs },
  //   } = student;
  //   const { basicHtml, basicJs, advancedJs } = student.grades;

  console.log(`Student name: ${firstName} ${lastName}, Age: ${age}`);
  console.log(`BasicHTML: ${basicHtml}`);
  console.log(`BasicJS: ${basicJs}`);
  console.log(`AdvJS: ${advancedJs}`);
};

printStudentInfo(student);

// Copying objects and arrays

const person = {
  firstName: "Jane",
  lastName: "Doe",
  age: 35,
};

// Avoid like the plague
// const personCopy = person;

// Always use spread operator to copy objects to avoid headaches
const personCopy = { ...person };

personCopy.lastName = "Petrovski";

console.log("Original", person);
console.log("Copy", personCopy);

const leftHalfNums = [1, 2, 3, 4, 5];
const rightHalfNums = [6, 7, 8, 9, 10];

const wholeNumsArr = [...leftHalfNums, ...rightHalfNums, 11, 12, 13, 14, 15];
const wholeNumsCopy = [...wholeNumsArr];

wholeNumsArr.sort((a, b) => b - a);

console.log(wholeNumsArr);
console.log(wholeNumsCopy);

// this keyword recap

class Person {
  constructor(firstName, lastName, age) {
    // Use when defining properties in classes/objects
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  // Use always in class/object methods
  printFullName() {
    const { firstName, lastName } = this;

    // console.log("From method", this);
    console.log(`Person's full name is: ${firstName} ${lastName}`);
  }
}

const bobbyPerson = new Person("Bob", "Bobsky", 89);

bobbyPerson.printFullName();
