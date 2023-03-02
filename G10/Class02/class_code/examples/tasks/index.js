const taskService = require("./task.service");

// taskService.createTask("Teach programming");
// taskService.createTask("Study progamming");
// taskService.createTask("Debug programming");
// taskService.createTask("Fix nodemon");
// taskService.createTask("Implement delete functionality");

// taskService.createTask("Finish class");
// taskService.createTask("Ask questions");
// taskService.createTask("Finish them all");

// taskService.finishTask("05c2531c-4838-4ba8-8b8f-6fb89b4eecf9");
// taskService.finishTask("061e15a2-2994-4807-8528-60c50c2cd54d");
// taskService.finishTask("ec359263-3e09-4f53-aff9-1cd00c875e26");

// taskService.deleteTask("ec359263-3e09-4f53-aff9-1cd00c875e26")

const tasks = taskService.getAllTasks();

taskService.finishAllTasks(tasks);
