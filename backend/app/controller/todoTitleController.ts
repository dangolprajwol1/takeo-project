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
      // console.log(completed);
      // if task title is completed and passed true make all mini task complete
      if (completed) {
        await Todos.updateMany(
          { todosTitle: todoTitle?._id },
          { $set: { completed: true } }
        );
      }

      // if parameter is passed false make all mini task incomplete
      if (!title && !completed) {
        await Todos.updateMany(
          { todosTitle: todoTitle?._id },
          { $set: { completed: false } }
        );
      }
    } catch (err) {
      throw new ApplicationError(500, "Error", [
        {
          field: "error",
          message: "Error Updating Data",
        },
      ]);
    }

    return res.status(200).json({ success: true, todoTitle });
  }
);
// get todo title with all tasks
export const getTodoTitle = tryCatchWrapper(
  async (req: Request, res: Response) => {
    let todo = await TodosTitle.findById(req.params.id).populate({
      path: "todos",
    });

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
export const getTodoTitleByUser = tryCatchWrapper(
  async (req: Request, res: Response) => {
    let todo = await TodosTitle.find({ user: req.params.id }).populate({
      path: "todos",
    });
    // console.log(todo);
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
    res.status(200).json({ success: true, deleted });
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
  ).populate({
    path: "todos",
  });

  if (!todoTitle) {
    return [];
  }
  return todoTitle;
};
