import jwt from "jsonwebtoken";
import { TokenInput } from "../DataTypes/user";
export const generateJwtToken = (user: TokenInput) => {
  return jwt.sign(user, process.env.SECRET_JWT as string);
};
export const verifyToken = (token: string, callback: any) => {
  return jwt.verify(token, process.env.SECRET_JWT as string, callback);
};
