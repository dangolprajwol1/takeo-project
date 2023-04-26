import express from "express";
import {
  createTodoTitle,
  deleteTodoTitle,
  getTodoTitle,
  getTodoTitleByUser,
  updateTodoTitle,
} from "../controller/todoTitleController";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controller/todoController";

const todoTitleRouter = express.Router();
/* Task Title routes  starts here */
todoTitleRouter.post("/addTodo", createTodoTitle);
todoTitleRouter.get("/getTodo/:id", getTodoTitle);
todoTitleRouter.get("/getTodoUser/:id", getTodoTitleByUser);
todoTitleRouter.patch("/updateTodo/:id", updateTodoTitle);
todoTitleRouter.delete("/deleteTodo/:id", deleteTodoTitle);
/* Task Title routes  ends here  */

/* Sub Task routes starts here */
todoTitleRouter.post("/addTodo/task", createTodo);
todoTitleRouter.get("/getTodo/task/:id", getTodo);
todoTitleRouter.patch("/updateTodo/task/:id", updateTodo);
todoTitleRouter.delete("/deleteTodo/task/:id", deleteTodo);
/* Sub Task routes end here */
export default todoTitleRouter;
