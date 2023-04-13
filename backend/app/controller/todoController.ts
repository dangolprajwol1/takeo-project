import { Request, Response } from "express";
import { tryCatchWrapper } from "../services/tryCatch";

import ApplicationError from "../services/appError";
import Todos from "../model/todos";
import TodosTitle from "../model/todosTitle";
import { TodosToTitle } from "./todoTitleController";

export const createTodo = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const { description, todosTitle } = req.body;
    try {
      const todo = await Todos.create({
        description,
        completed: false,
        todosTitle,
      });
      await TodosToTitle(todosTitle, todo._id.toString(), "add");
      res.status(201).json({
        success: true,
        todo,
      });
    } catch (err) {
      throw new ApplicationError(500, "Error", [
        {
          field: "error",
          message: "Error Adding Task ",
        },
      ]);
    }
  }
);

export const updateTodo = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const { description, completed } = req.body;
    let todo;
    try {
      todo = await TodosTitle.findByIdAndUpdate(
        req.params.id,
        {
          description,
          completed,
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

    return res.status(200).json(todo);
  }
);

export const deleteTodo = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const deleted = await Todos.findOneAndDelete({ _id: req.params.id });
    if (!deleted) {
      throw new ApplicationError(500, "Error", [
        {
          field: "error",
          message: "Error Deleting Data",
        },
      ]);
    }
    await TodosToTitle(
      deleted.todosTitle!.toString(),
      deleted._id.toString(),
      "delete"
    );
    res.status(200).json(deleted);
  }
);

export const getTodo = tryCatchWrapper(async (req: Request, res: Response) => {
  let todo = await Todos.findById(req.params.id);

  if (!todo) {
    throw new ApplicationError(500, "Error", [
      {
        field: "error",
        message: "Error finding Data",
      },
    ]);
  }
  return res.status(200).json(todo);
});
