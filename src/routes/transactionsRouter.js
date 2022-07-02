import { Router } from 'express';
import { getTransactions, postDeposit, postWithdrawal } from '../controllers/transactionsController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenValidationMiddleware.js';
import transctionsValidationsMiddleware from '../middlewares/transactionsValidationMiddleware.js'


const transactionsRouter = Router();
//validade token for every route
transactionsRouter.use(tokenValidationMiddleware); 
transactionsRouter.get("/transactions", getTransactions);
transactionsRouter.post("/deposit",transctionsValidationsMiddleware, postDeposit);
transactionsRouter.post("/withdrawal",transctionsValidationsMiddleware, postWithdrawal);
export default transactionsRouter;
