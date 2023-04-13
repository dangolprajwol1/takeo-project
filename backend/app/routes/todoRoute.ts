import express from "express";
import {
  createTodoTitle,
  deleteTodoTitle,
  getTodoTitle,
  updateTodoTitle,
} from "../controller/todoTitleController";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controller/todoController";

const todoTitleRouter = express.Router();

todoTitleRouter.post("/addTodo", createTodoTitle);
todoTitleRouter.get("/getTodo/:id", getTodoTitle);
todoTitleRouter.patch("/updateTodo/:id", updateTodoTitle);
todoTitleRouter.delete("/deleteTodo/:id", deleteTodoTitle);

todoTitleRouter.post("/addTodo/task", createTodo);
todoTitleRouter.get("/getTodo/task/:id", getTodo);
todoTitleRouter.patch("/updateTodo/task/:id", updateTodo);
todoTitleRouter.delete("/deleteTodo/task/:id", deleteTodo);
export default todoTitleRouter;
