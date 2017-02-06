import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import config from '../config';
import {isEmailValid, ERROR_MESSAGES} from '../../common/lib/validation';

const TOKEN_EXPIRATION_TIME = 60 * 60 * 24 * 365;

const mapOutputUser = (user) => ({
  trelloId: user.trelloId,
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
    const secret = User.encryptSecret(salt);
    token = jwt.sign({id: trelloUser.id}, secret, { expiresIn: TOKEN_EXPIRATION_TIME });
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

UserSchema.statics.encryptSecret = (salt) =>
  crypto.createHmac('sha1', salt).update(config.userSecret).digest('hex');

/**
 * Get user by token
 * @param token
 * @returns {Promise}
 */
UserSchema.statics.authorizeUserByToken = function (token) {
  const User = this;
  const decodedToken = jwt.decode(token);

  if (!decodedToken || !decodedToken.id) {
    return Promise.reject('Token is incorrect or exprired');
  }

  return User.findOne({trelloId: decodedToken.id})
    .then(user => user.validateUser(token))
    .then(mapOutputUser);
};

/**
 * Validate user by token
 * @param token
 * @returns {Promise}
 */
UserSchema.methods.validateUser = function (token) {
  const User = this;
  const secret = User.constructor.encryptSecret(User.salt);
  return new Promise((resolve, reject) =>
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return reject(err);
      }
      return resolve(User);
    })
  );
};

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
