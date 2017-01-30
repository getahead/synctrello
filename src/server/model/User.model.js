import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import {isEmailValid, ERROR_MESSAGES} from '../../common/lib/validation';

const TOKEN_EXPIRATION_TIME = 60 * 60 * 24 * 365;

const mapOutputUser = (user) => ({
  username: user.username,
  locale: user.locale,
  idBoards: user.idBoards
});

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: isEmailValid,
      message: ERROR_MESSAGES.VALIDATE_EMAIL
    },
    // required: [true, 'Email is required']
  },
  hashedPassword: {
    type: String,
    // required: true
  },
  salt: {
    type: String,
    // required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastSynced: {
    type: Date,
    default: Date.now
  },

  // TRELLO DATA
  trelloId: {
    type: String,
    required: true,
    index: true
  },
  trelloToken: {
    type: String,
    required: true
  },
  idBoards: [String],
  fullName: String,
  url: String,
  locale: String,
  avatarHash: String
});

UserSchema.statics.findUserAndSync = function (trelloToken, trelloUser, updateToken = true) {
  const User = this;
  const userMapper = {
    trelloToken,
    trelloId: trelloUser.id,
    idBoards: trelloUser.idBoards,
    email: trelloUser.email,
    username: trelloUser.username,
    url: trelloUser.url,
    locale: trelloUser.prefs.locale,
    lastSynced: Date.now()
  };

  let token;

  if (updateToken) {
    const salt = Math.random() + '';
    token = jwt.sign({id: trelloUser.id}, salt, { expiresIn: TOKEN_EXPIRATION_TIME });
    userMapper.salt = salt;
  }

  return User.findOneAndUpdate({trelloId: trelloUser.id}, userMapper, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  }).lean()
    .then(user => ({
      token,
      user: mapOutputUser(user)
    }));
};

UserSchema.statics.authorizeUserByToken = function (token) {
  const User = this;
  const decodedToken = jwt.decode(token);

  console.log(jwt.decode(token))
  if (!decodedToken || !decodedToken.id) {
    return Promise.reject('Token is incorrect or exprired');
  }

  console.log(decodedToken.id)
  return User.findOne({trelloId: decodedToken.id})
    .then(mapOutputUser)
};

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
