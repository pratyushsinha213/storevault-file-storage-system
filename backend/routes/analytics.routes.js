import { Router } from "express";
const analyticsRouter = Router();

import { getFileTypeDistribution, getStorageUsage, getTopFiles, getUploadActivity, } from '../controllers/analytics.controller.js';
import isProtected from '../middlewares/isProtected.js';



analyticsRouter.get('/storage', isProtected, getStorageUsage);
analyticsRouter.get('/uploads', isProtected, getUploadActivity);
analyticsRouter.get('/file-types', isProtected, getFileTypeDistribution);
analyticsRouter.get('/top-files', isProtected, getTopFiles);

export default analyticsRouter;
