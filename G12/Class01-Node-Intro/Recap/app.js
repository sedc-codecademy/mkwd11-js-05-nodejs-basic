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
