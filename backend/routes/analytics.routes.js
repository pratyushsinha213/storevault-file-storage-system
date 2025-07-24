import { Router } from "express";
const analyticsRouter = Router();

import { trackAnalytics, getRealtimeStats, getDailyStats, getTopPages } from '../controllers/analytics.controller.js';
import isProtected from '../middlewares/isProtected.js';
import isAdmin from '../middlewares/isAdmin.js';

analyticsRouter.post('/track', trackAnalytics);
analyticsRouter.get('/realtime', isProtected, isAdmin, getRealtimeStats);
analyticsRouter.get('/stats/daily', isProtected, isAdmin, getDailyStats);
analyticsRouter.get('/stats/top-pages', isProtected, isAdmin, getTopPages);

export default analyticsRouter;
