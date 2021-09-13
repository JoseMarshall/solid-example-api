import { HttpRequest } from '../../../../controllers/controllers.type';
import createUserSchemaValidator from './create-user-schema';

// eslint-disable-next-line import/prefer-default-export
export const makCreateUserValidator = () => async (req: HttpRequest) =>
  createUserSchemaValidator(req);
