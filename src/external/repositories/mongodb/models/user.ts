import { Schema } from 'mongoose';

import { MongoHelper } from '../helpers/mongo-helper';
import { UserDocument } from './model.types';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

userSchema.set('toObject', {
  virtuals: true,
});

userSchema.set('toJSON', {
  virtuals: true,
});

const user = MongoHelper.getModel<UserDocument>('users', userSchema);

export default user;
