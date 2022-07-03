import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import sinUpSchemaValidationMiddleware from '../middlewares/signUpSchemaValidationMiddleware.js';
import signInSchemaValidationMiddleware from '../middlewares/signInSchemaValidationMiddleware.js';


const authRouter = Router();
authRouter.post("/sign-up", sinUpSchemaValidationMiddleware, signUp);
authRouter.post("/sign-in", signInSchemaValidationMiddleware, signIn);
export default authRouter;