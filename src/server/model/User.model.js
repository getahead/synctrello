import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  login: Schema.Types.String,
  email: Schema.Types.String,
  trelloToken: Schema.Types.String
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
