import { Request, Response } from "express";
import { tryCatchWrapper } from "../services/tryCatch";
import ApplicationError from "../services/appError";
import { findUser } from "../controller/userController";
import { UserResponse } from "../DataTypes/user";
import { comparePassword } from "../services/bcrypt";

const loginValidation = tryCatchWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim()) {
    throw new ApplicationError(500, "Error", [
      {
        field: "error",
        message: "Fields should not be empty",
      },
    ]);
  }
  const user: UserResponse | null = await findUser(email, "email");
  if (!user) {
    throw new ApplicationError(500, "Error", [
      {
        field: "error",
        message: "User Not Found",
      },
    ]);
  }
  const isSamePassword = await comparePassword(password, user.password);
  if (!isSamePassword) {
    throw new ApplicationError(500, "Error", [
      {
        field: "error",
        message: "Password Do not Match",
      },
    ]);
  }
});
export default loginValidation;
