import CustomError from '../../validators/errors/custom-error';
import { CreateUserHttpRequest } from '../../validators/types/user';
import { MakeCreateOneUserDependencies } from './user.types';

// eslint-disable-next-line import/prefer-default-export
export function makeCreateUserController({
  createUser,
  requestValidator,
}: MakeCreateOneUserDependencies) {
  return {
    handle: async (req: CreateUserHttpRequest) => {
      const validatedRequest = await requestValidator(req);
      const { name, email } = validatedRequest.body;
      const result = await createUser.execute({ name, email });

      if (result instanceof CustomError) {
        throw result;
      }

      return {
        status: 201,
        body: result.payload,
        msg: {
          i18nCode: 'S-3000',
          defaultValue: 'any message',
        },
      };
    },
  };
}
