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
import isUser from "../middleware/isUser";

const todoTitleRouter = express.Router();
/* Task Title routes  starts here */
todoTitleRouter.post("/addTodo", isUser, createTodoTitle);
todoTitleRouter.get("/getTodo/:id", getTodoTitle);
todoTitleRouter.get("/getTodoUser/:id", getTodoTitleByUser);
todoTitleRouter.patch("/updateTodo/:id", isUser, updateTodoTitle);
todoTitleRouter.delete("/deleteTodo/:id", isUser, deleteTodoTitle);
/* Task Title routes  ends here  */

/* Sub Task routes starts here */
todoTitleRouter.post("/addTodo/task", isUser, createTodo);
todoTitleRouter.get("/getTodo/task/:id", getTodo);
todoTitleRouter.patch("/updateTodo/task/:id", isUser, updateTodo);
todoTitleRouter.delete("/deleteTodo/task/:id", isUser, deleteTodo);
/* Sub Task routes end here */
export default todoTitleRouter;
