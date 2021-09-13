export interface UserData {
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}

export interface MakeUser {
  data: UserData;
}
