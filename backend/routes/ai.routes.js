import { Router } from "express";
const aiRouter = Router();

import { aiResponse } from "../controllers/ai.controller.js";

aiRouter.post('/response-from-ai', aiResponse);

export default aiRouter;