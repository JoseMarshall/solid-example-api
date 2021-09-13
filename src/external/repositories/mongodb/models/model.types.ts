import { Document } from 'mongoose';

export interface TimeStamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends Document, TimeStamps {
  name: string;
  email: string;
}
