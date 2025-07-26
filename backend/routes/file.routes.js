import { Router } from "express";
const fileRouter = Router();

import isProtected from "../middlewares/isProtected.js";
import upload from "../middlewares/upload.js";
import { getAllFiles, uploadFile, getFileById, updateFile, deleteFile, createFolder, renameFolder } from '../controllers/file.controller.js';

fileRouter.use(isProtected);

fileRouter.get('/', getAllFiles);
fileRouter.post('/upload', upload.single('file'), uploadFile);
fileRouter.get('/:id', getFileById);
fileRouter.delete('/:id', deleteFile);
// TODO: Implement update file functionality
fileRouter.put('/:id', updateFile);

// Creating folder routes
fileRouter.post('/folder', isProtected, createFolder);
fileRouter.put('/folder/:id', isProtected, renameFolder);

export default fileRouter;