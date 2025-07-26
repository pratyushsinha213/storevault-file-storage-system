import { Router } from "express";
const userRouter = Router();

import {
    registerUser, loginUser, logoutUser, getProfile, getProfileDetails,
    // upgradeStoragePlan
} from '../controllers/user.controller.js';
import isProtected from "../middlewares/isProtected.js";
import { upgradePlanCheck } from "../controllers/file.controller.js";

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

// Protected routes
userRouter.get('/profile', isProtected, getProfile);
userRouter.get('/get-profile-details', isProtected, getProfileDetails);
userRouter.post('/upgrade-plan-check', isProtected, upgradePlanCheck);
// userRouter.post('/upgrade-storage-tier', isProtected, upgradeStoragePlan);

export default userRouter;