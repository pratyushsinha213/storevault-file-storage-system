import { Router } from "express";
const stripeRouter = Router();

import isProtected from "../middlewares/isProtected.js";
import { cancelledPayment, checkoutPayment, successPayment } from "../controllers/stripe.controller.js";

stripeRouter.use(isProtected);

stripeRouter.post('/checkout', checkoutPayment);
stripeRouter.post('/success', successPayment);
stripeRouter.post('/cancelled', cancelledPayment);


export default stripeRouter;