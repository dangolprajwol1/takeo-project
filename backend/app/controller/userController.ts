import { Request, Response } from "express";
import Users from "../model/users";
import { comparePassword, encryptPassword } from "../services/bcrypt";
import mongoose from "mongoose";
import { tryCatchWrapper } from "../services/tryCatch";
import ApplicationError from "../services/appError";
import { inputValidation, userExists } from "../services/userValidation";
import { UserResponse } from "../DataTypes/user";
import { generateJwtToken } from "../services/jwt";

export const createUser = tryCatchWrapper(
  async (req: Request, res: Response) => {
    console.log(" I AM INSIDE CONTROLLER");
    const { username, password, email, phone } = req.body;
    try {
      const encrypted_password = await encryptPassword(password);
      const user = await Users.create({
        username,
        password: encrypted_password,
        email,
        phone,
        activated: false,
      });
      return res.send({
        error: false,
        user,
      });
      // res.status(201).json({
      //   success: true,
      //   user,
      // });
    } catch (err) {
      throw new ApplicationError(500, "Error", [
        {
          field: "error",
          message: "Error Registering User !! ",
        },
      ]);
    }
  }
);
export const updateUser = async (req: Request, res: Response) => {
  const { password, phone, activated } = req.body;
  let currentUser = await findUser(req.params.userId, "id");
  if (!currentUser) {
    return res.status(404).json({ error: "USER NOT FOUND IN DB" });
  }
  const encrypted_password = currentUser
    ? currentUser.password!
    : await encryptPassword(password);
  try {
    await Users.findByIdAndUpdate(
      req.params.userId,
      { password: encrypted_password, phone, activated },
      { new: true }
    );
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: " Invalid Entries " });
  }

  return res.status(200).json({
    success: true,
    message: "Profile details updated ",
  });
};

export const getUSerById = tryCatchWrapper(
  async (req: Request, res: Response) => {
    let UserExists = await findUser(req.params.userId, "id");
    if (!UserExists) {
      return;
    }
    return res.status(200).json(userExists);
  }
);
export const userLogin = tryCatchWrapper(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: UserResponse | null = await findUser(email, "email");

    if (!user) {
      throw new ApplicationError(501, "Error", [
        {
          field: "error",
          message: "Invalid user",
        },
      ]);
    }

    const token = generateJwtToken({
      username: user.username,
      id: user._id,
    });
    return res.send({
      error: false,
      status: 200,
      token,
      user: user.username,
      uid: user._id,
    });

    // return res.status(200).json(user);
  }
);
export const findUser = async (userId: string, by: string) => {
  let user: UserResponse | null;
  try {
    user =
      by === "id"
        ? await Users.findById(userId.trim())
        : await Users.findOne({ email: userId });
    if (!user) {
      return null;
    }
  } catch (err) {
    return null;
  }

  return user;
};
