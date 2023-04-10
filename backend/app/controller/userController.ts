import { Request, Response } from "express";
import Users from "../model/users";

export const createUser = async (req: Request, res: Response) => {
  const { username, password, email, phone } = req.body;
  console.log(req.body);
  try {
    const user = await Users.create({
      username,
      password,
      email,
      phone,
      activated: false,
    });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: " Error Registering User ",
    });
  }
};
