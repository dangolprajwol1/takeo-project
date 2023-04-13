import express from "express";
import {
  createUser,
  getUSerById,
  updateUser,
  userLogin,
} from "../controller/userController";
import userDataValidator from "../middleware/validationMiddleware";
import loginValidation from "../middleware/loginValidationMiddleware";

const router = express.Router();

router.post("/user", userDataValidator, createUser);
router.route("/user/:userId").patch(updateUser);
router.route("/user/:userId").get(getUSerById);
router.route("/login").post(loginValidation, userLogin);
// router.route("/userv2/:id").get(getUSerByIdV2);

export default router;
