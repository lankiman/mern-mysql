import express from "express";
import { loginUser, signupUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.post("/signup", signupUser);

export default userRouter;
