import { addTodo, readTodos } from "./file-service.js";


readTodos("./db/todos.json");


addTodo("./db/todos.json", "Study node js", false)

addTodo("./db/todos.json", "Go to the gym", false)

addTodo("./db/todos.json", "Clean the room", true)

