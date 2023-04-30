// import { Request, Response } from "express";
// import Users from "../model/users";
// import { encryptPassword } from "../services/bcrypt";
// import mongoose from "mongoose";
// import { tryCatchWrapper } from "../services/tryCatch";

// const createUser = async (req: Request, res: Response) => {
//   const { username, password, email, phone } = req.body;

//   let UserExists;
//   // find by username
//   try {
//     UserExists = await Users.findOne({ username });
//   } catch (err) {
//     return res.status(409).json({
//       success: false,
//       message: "Username Already Exists",
//     });
//   }

//   try {
//     UserExists = await Users.findOne({ email });
//   } catch (err) {
//     return res.status(409).json({
//       success: false,
//       message: "Email Already Exists",
//     });
//   }

//   try {
//     const encrypted_password = await encryptPassword(password);
//     const user = await Users.create({
//       username,
//       password: encrypted_password,
//       email,
//       phone,
//       activated: false,
//     });
//     res.status(201).json({
//       success: true,
//       user,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Error Registering User",
//     });
//   }
// };

// const updateUser = async (req: Request, res: Response) => {
//   const { password, phone, activated } = req.body;
//   let currentUser = await findUser(req.params.userId);
//   if (!currentUser.success) {
//     return res.status(404).json({ error: "USER NOT FOUND IN DB" });
//   }
//   const encrypted_password = currentUser
//     ? currentUser.user!.password!
//     : await encryptPassword(password);
//   try {
//     await Users.findByIdAndUpdate(
//       req.params.userId,
//       { password: encrypted_password, phone, activated },
//       { new: true }
//     );
//   } catch (err) {
//     return res
//       .status(404)
//       .json({ success: false, message: " Invalid Entries " });
//   }

//   return res.status(200).json({
//     success: true,
//     message: "Profile details updated ",
//   });
// };

// const getUSerById = async (req: Request, res: Response) => {
//   let UserExists;
//   try {
//     UserExists = await findUser(req.params.userId);
//   } catch (err) {
//     return res.status(404).json({ success: false, message: "Users Not Found" });
//   }

//   return res.status(200).json({ success: true, user: UserExists });
// };

// const getUSerByIdV2 = tryCatchWrapper(async (req: Request, res: Response) => {
//   let UserExists = await Users.findById({ _id: req.params.id.trim() });
//   if (!UserExists) {
//     throw new Error(" USER NOT FOUND ANYWHERE INSIDE DB");
//   }
//   return res.status(200).json({ user: UserExists });
// });

// const findUser = async (userId: string) => {
//   let user;
//   try {
//     user = await Users.findById(userId.trim());
//   } catch (err) {
//     return { success: false, user: user };
//   }
//   // console.log(user);

//   return { success: true, user: user };
// };

// interface UserData {
//   username: string;
//   password: string;
//   email: string;
//   phone: number;
//   activated: boolean;
//   created?: Date;
// }
