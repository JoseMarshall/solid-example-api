import { ApiErrorsName, ApiErrorsType } from '../../../constants';
import { UserData } from '../../../entities/user/user.types';
import CustomError from '../../../validators/errors/custom-error';
import { IUserRepository } from '../types/repository.types';
import { queryGuard } from './helpers/mongo-helper';
import { UserModel } from './models';

// eslint-disable-next-line import/prefer-default-export
async function findAllUsers() {
  try {
    const users = await queryGuard<UserData[]>(UserModel.find().lean());

    return { payload: users };
  } catch (error) {
    return new CustomError({
      statusCode: 422,
      name: ApiErrorsName.GenericName,
      type: ApiErrorsType.GenericType,
      message: `Couldn't find any user`,
      i18nCode: 'E-1008',
      stack: error.stack,
      details: error,
    });
  }
}

async function findUserByEmail(email: string) {
  try {
    const user = await queryGuard<UserData>(UserModel.findOne({ email }).lean());

    return { payload: user };
  } catch (error) {
    return new CustomError({
      statusCode: 422,
      name: ApiErrorsName.GenericName,
      type: ApiErrorsType.GenericType,
      message: `Couldn't find any user`,
      i18nCode: 'E-1008',
      stack: error.stack,
      details: error,
    });
  }
}

async function save(user: UserData) {
  try {
    await queryGuard(UserModel.create(user));
    return { payload: user };
  } catch (error) {
    return new CustomError({
      statusCode: 422,
      name: ApiErrorsName.GenericName,
      type: ApiErrorsType.GenericType,
      message: `Couldn't find any user`,
      i18nCode: 'E-1008',
      stack: error.stack,
      details: error,
    });
  }
}

async function exists(email: string) {
  return { payload: await UserModel.exists({ email }) };
}

// eslint-disable-next-line import/prefer-default-export
export const UserRepository: IUserRepository = {
  findAllUsers,
  findUserByEmail,
  save,
  exists,
};
