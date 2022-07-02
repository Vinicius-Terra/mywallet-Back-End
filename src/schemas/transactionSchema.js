import joi from 'joi';

const transactionSchema = joi.object({
  description: joi.string().required(),
  value: joi.number().required()
});


export default transactionSchema;