import { NextFunction, Request, Response } from "express";

export const tryCatchWrapper =
  (controller: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
      console.log("trying");

      next();
      return;
    } catch (error) {
      console.log(" i ran now");
      next(error);
    }
  };
