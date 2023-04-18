import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../services/tryCatch";
import { inputValidation, userExists } from "../services/userValidation";
import ApplicationError from "../services/appError";

const userDataValidator = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, phone, confirmpw } = req.body;
    const validation = await inputValidation({
      username,
      password,
      email,
      phone,
    });
    console.log(validation);
    if (validation.length > 0) {
      throw new ApplicationError(500, "Error", validation);
    }
    if (password !== confirmpw) {
      throw new ApplicationError(500, "Error", [
        {
          field: "password",
          message: "Password Do not Match !!",
        },
      ]);
    }

    let UserExist;
    // find by username
    UserExist = await userExists(username, "username");
    if (UserExist) {
      throw new ApplicationError(500, "Error", [
        {
          field: "username",
          message: "That Username Already Exists",
        },
      ]);
    }
    //find by email
    UserExist = await userExists(email, "email");
    if (UserExist) {
      throw new ApplicationError(500, "Error", [
        {
          field: "email",
          message: "That Email is associated with another account !!",
        },
      ]);
    }
    // next();
  }
);
export default userDataValidator;
