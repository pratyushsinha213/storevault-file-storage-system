import { Router } from "express";
const userRouter = Router();

import { registerUser, loginUser, logoutUser, getProfile, getProfileDetails } from '../controllers/user.controller.js';
import isProtected from "../middlewares/isProtected.js";

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

// Protected route - To acccess this, send the bearer token in the Authorization header
userRouter.get('/profile', isProtected, getProfile);
userRouter.get('/get-profile-details', isProtected, getProfileDetails);

export default userRouter;