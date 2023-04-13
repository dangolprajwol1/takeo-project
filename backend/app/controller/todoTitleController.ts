import { Request, Response } from "express";
import { tryCatchWrapper } from "../services/tryCatch";
import TodosTitle from "../model/todosTitle";
import ApplicationError from "../services/appError";
import Todos from "../model/todos";

export const createTodoTitle = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const { title, expiry, user } = req.body;
    try {
      const todoTitle = await TodosTitle.create({
        title,
        expiry,
        user,
        completed: false,
      });
      res.status(201).json({
        success: true,
        todoTitle,
      });
    } catch (err) {
      throw new ApplicationError(500, "Error", [
        {
          field: "error",
          message: "Error Adding Task Group !! ",
        },
      ]);
    }
  }
);

// update todotitle
export const updateTodoTitle = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const { title, completed, expiry } = req.body;
    let todoTitle;
    try {
      todoTitle = await TodosTitle.findByIdAndUpdate(
        req.params.id,
        {
          title,
          completed,
          expiry,
        },
        { new: true }
      );
    } catch (err) {
      throw new ApplicationError(500, "Error", [
        {
          field: "error",
          message: "Error Updating Data",
        },
      ]);
    }

    return res.status(200).json(todoTitle);
  }
);
// get todo title with all tasks
export const getTodoTitle = tryCatchWrapper(
  async (req: Request, res: Response) => {
    let todo = await TodosTitle.findById(req.params.id).populate("todosTitle");

    if (!todo) {
      throw new ApplicationError(500, "Error", [
        {
          field: "error",
          message: "Error finding Data",
        },
      ]);
    }
    return res.status(200).json(todo);
  }
);
export const deleteTodoTitle = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const deleted = await TodosTitle.findOneAndDelete({ _id: req.params.id });
    if (!deleted) {
      throw new ApplicationError(500, "Error", [
        {
          field: "error",
          message: "Error Deleting Data",
        },
      ]);
    }
    //delete all todo tasks under current title
    await Todos.deleteMany({ _id: { $in: deleted.todos } });
    res.status(200).json(deleted);
  }
);
// function to add or remove tasks to todo title
export const TodosToTitle = async (
  todoTitleId: string,
  taskId: string,
  operationType: string
) => {
  if (!taskId.trim()) {
    return [];
  }
  let operation =
    operationType === "add"
      ? { $push: { todos: taskId } }
      : { $pull: { todos: taskId } };
  // add task to todo title
  let todoTitle = await TodosTitle.findByIdAndUpdate(
    todoTitleId,
    operation, // push todo id inside todotitle
    { new: true }
  );

  if (!todoTitle) {
    return [];
  }
  return todoTitle;
};