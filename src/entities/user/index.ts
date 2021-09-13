import { v4 as uuid } from 'uuid';

import { MakeUser } from './user.types';

// eslint-disable-next-line import/prefer-default-export
export async function makeUser({ data }: MakeUser) {
  if (!('id' in data)) {
    data.id = uuid();
  }
  data.isDeleted = false;
  data.createdAt = new Date().toISOString();
  data.updatedAt = new Date().toISOString();

  return data;
}
