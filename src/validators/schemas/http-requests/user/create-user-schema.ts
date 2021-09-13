import joi from 'joi';

import joiValidator from '../../../index';
import { CreateUserHttpRequest } from '../../../types/user';

const createUserSchema = joi
  .object({
    body: joi
      .object({
        name: joi.string().required(),
        email: joi.string().email().required(),
      })
      .required()
      .unknown(false),
    query: joi.object({}).unknown(false),
  })
  .required()
  .unknown(true);

export default joiValidator<CreateUserHttpRequest>(createUserSchema);
