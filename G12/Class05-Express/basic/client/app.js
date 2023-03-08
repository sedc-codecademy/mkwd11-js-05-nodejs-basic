fetch("http://localhost:3000/tasks")
  .then(res => res.json())
  .then(value => console.log(value));
