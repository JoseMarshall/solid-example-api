import { UserData } from '../../../entities/user/user.types';
import CustomError from '../../../validators/errors/custom-error';

export interface IUserRepository {
  findAllUsers(): Promise<CustomError | { payload: UserData[] }>;
  findUserByEmail(email: string): Promise<CustomError | { payload: UserData }>;
  save(user: UserData): Promise<CustomError | { payload: UserData }>;
  exists(email: string): Promise<{ payload: boolean }>;
}
