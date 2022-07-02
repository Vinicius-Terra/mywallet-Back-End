import { Router } from 'express';
import { getTransactions, postDeposit, postWithdrawal } from '../controllers/transactionsController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenValidationMiddleware.js';


const transactionsRouter = Router();
//validade token for every route
transactionsRouter.use(tokenValidationMiddleware); 
transactionsRouter.get("/transactions", getTransactions);
transactionsRouter.post("/deposit", postDeposit);
transactionsRouter.post("/withdrawal", postWithdrawal);
export default transactionsRouter;
