import { ApiErrorsName, ApiErrorsType } from '../../constants';
import { makeUser } from '../../entities/user';
import { UserData } from '../../entities/user/user.types';
import { IUserRepository } from '../../external/repositories/types/repository.types';
import CustomError from '../../validators/errors/custom-error';

// eslint-disable-next-line import/prefer-default-export
export function makeCreateUserUseCase(userRepository: IUserRepository) {
  return {
    execute: async (data: UserData) => {
      const userAlreadyExists = await userRepository.exists(data.email);

      if (userAlreadyExists.payload) {
        return new CustomError({
          i18nCode: 'E-1004',
          details: {},
          message: 'User already exists',
          name: ApiErrorsName.GenericName,
          type: ApiErrorsType.GenericType,
          stack: '',
          statusCode: 422,
        });
      }
      const user = await makeUser({ data });

      return userRepository.save(user);
    },
  };
}
