import { NextFunction, Request, Response } from "express";
import ApplicationError from "../services/appError";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("running");
  if (error instanceof ApplicationError) {
    return res.status(error.status).json({ error: true, message: error.error });
  }
  res.status(404).json({ error: true, message: error.message });
  // next();
};
export default errorHandler;
