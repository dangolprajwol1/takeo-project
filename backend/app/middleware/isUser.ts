import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import Users from "../model/users";

// interface JWTPayload {
//   id: string;
//   username: string;
//   iat: Date;
// }
const isUser = (req: Request, res: Response, next: NextFunction) => {
  const BearerToken = req.headers["authorization"];

  if (!BearerToken) {
    res.send(noTokenResponse);
    return;
  }
  const token = splitToken(BearerToken);

  if (!token) {
    res.status(498).send(noTokenResponse);
    return;
  }
  console.log("ok");
  console.log(token);
  //   next();
  try {
    const { id } = jwt.verify(
      token,
      process.env.SECRET_JWT as string
    ) as JwtPayload;

    // Check the the user is correct or not

    const UserInDatabase = Users.findById(id);
    console.log(UserInDatabase);
    if (!UserInDatabase) {
      res.status(498).send({
        success: false,
        status: 498,
        message: "User is not correct  ,Invalid Token: Login again",
      });
      return;
    }
    next();
  } catch (e) {
    res.status(498).send({
      success: false,
      status: 498,
      message: "Could not verify the user , Please login again",
    });
    return;
  }
};

const splitToken = (bearer: any) => bearer?.split(" ")[1] || null;

const noTokenResponse = {
  success: false,
  status: 498,
  message: "Could not verify the user , No token: Login again",
};
export default isUser;
