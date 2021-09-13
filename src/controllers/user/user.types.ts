import { UserData } from '../../entities/user/user.types';
import CustomError from '../../validators/errors/custom-error';
import { CreateUserHttpRequest } from '../../validators/types/user';
import { RequestValidator } from '../controllers.type';

export interface MakeCreateOneUserDependencies {
  createUser: { execute(data: UserData): Promise<CustomError | { payload: UserData }> };
  requestValidator: RequestValidator<CreateUserHttpRequest>;
}
