import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
