import { makeCreateUserController } from '../../../controllers/user';
import { UserRepository } from '../../../external/repositories/mongodb/user-repository';
import { makeCreateUserUseCase } from '../../../usecases/create-user/create-user-case';
import { makCreateUserValidator } from '../../../validators/schemas/http-requests/user';

const createUser = makeCreateUserController({
  createUser: makeCreateUserUseCase(UserRepository),
  requestValidator: makCreateUserValidator(),
});

export default createUser;
