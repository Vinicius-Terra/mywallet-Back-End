import transactionSchema from "../schemas/transactionSchema.js";

export default function transctionsValidationsMiddleware(req, res, next) {

  const validation = transactionSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }


  next();
}