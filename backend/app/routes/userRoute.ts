import express from "express";
import { createUser } from "../controller/userController";

const router = express.Router();

router.route("/registerUser").post(createUser);

export default router;
