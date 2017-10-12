/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 'use strict';

 var Q = require('q'),
   _ = require('lodash'),
   uuid = require('node-uuid'),
   md5 = require('md5'),
   crypto = require('crypto');

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    passPlain: {
      type: 'string',
      required: true
    },
    // confirmPassword: {
    //   type: 'string',
    //   required: true
    // },
    type: {
      type: 'string',
      required: true
    },
    salt: {
      type: 'text',
      columnName: 'salt'
    },
    lastLoggedIn: {
      type: 'datetime',
      columnName: 'last_loggedIn'
    },
    isLoggedIn: {
      type: 'boolean',
      columnName: 'is_LoggedIn',
      defaultsTo: false
    },
    // salt: {
    //   type: 'text',
    //   columnName: 'salt'
    // },
    // lastLoggedin: {
    //   type: 'datetime',
    //   columnName: 'last_loggedin'
    // },
    // isLoggedin: {
    //   type: 'boolean',
    //   columnName: 'is_loggedin'
    // },
  },
  registerUser: registerUser,
  getUserForId: getUserForId,
  loginUser: loginUser,
  comparePassword: comparePassword,
  getAllUsers: getAllUsers
  // createNewRegistration: createNewRegistration,
  // createNewUser: createNewUser,
};

function registerUser(userData) {
  return Q.promise(function (resolve, reject) {
    var newUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        type: userData.type,
        role: "user",
        password: null,
        passPlain: userData.password,
        salt: null,
        isLoggedIn: false,
        lastLoggedIn: new Date()
      },
      salt = __generateSalt();
    __generateEncryptedPassword(userData.password, salt)
      .then(function (encryptedPassword) {
        // updating new user object
        newUser.password = encryptedPassword;
        newUser.salt = salt;
        // create profile for the user
        // create new user
        // check for role
      })
      .then(function(role) {

        return User.create(newUser);
      })
      .then(function (user) {
        // create new profile
        // console.log("createdUser:: " + JSON.stringify(user));
        return resolve(user);
      })
      .catch(function (err) {
        sails.log.error('User#createNewUserV2 :: Error while creating a new user :: ', err);
        return reject(err);
      });
  });
}

function __generateSalt() {
  return md5(uuid.v1());
}

function __generateUuid() {
  return __generateSalt();
}

function __generateEncryptedPassword(password, salt) {
  return Q.promise(function (resolve, reject) {
    crypto.pbkdf2(password, salt, 10, 512, 'sha512', function (err, encrypted) {
      if (err) {
        sails.log.error('User#__generateEncryptedPassword :: ', err);
        return reject(err);
      }

      return resolve(encrypted.toString('hex'));
    });
  });
}

function getUserForId(userId) {
  return Q.promise(function (resolve, reject) {
    if (!userId) {
      sails.log.error('User#getUserForId :: User id is null');
      return reject({
        code: 400,
        message: 'USER_INVALID_REQUEST'
      });
    }
    // criteria to load active user
    var criteria = {
      id: userId
    };
    console.log("userId : " + userId);
    User
      .findOne(criteria)
      .then(function (user) {
        if (!user) {
          return reject({
            code: 404,
            message: 'USER_NOT_FOUND'
          });
        } else {
          console.log("Success::Model : " + user.firstName);
          // convert the user
          return resolve(user);
        }
      })
      .catch(function (err) {
        // caught the error
        sails.log.error('User#getUserForId :: Error in query :: ', err);

        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
  });
}

function loginUser(email, passPlain) {
    return Q.promise(function (resolve, reject) {
        var criteria = {};
            criteria.email = email;
        // console.log("Model:: " + loginDetails.passPlain);
        User
          .findOne(criteria)
          .then(function (user) {
            if (!user) {
              return reject({
                code: 404,
                message: 'USER_NOT_FOUND'
              });
            } else {
              // convert the user
              return resolve(user);
            }
          })
          .catch(function (err) {
            sails.log.error('User#LoginUser :: Error while Login a user :: ', err);
            return reject(err);
          });
    });
}

function comparePassword(givenPassword, existedPassword){
   if(givenPassword === existedPassword) {
     return true;
   }
   else {
     return false;
   }
}

function getAllUsers() {
  return Q.promise(function(resolve, reject) {
    User
      .find()
      // success block
      .then(function(users) {
        // do other tasks with new admin
        return resolve(users);
      })
      // error block
      .catch(function(err) {
        sails.log.error("Admin#getAllUsers:: Error :: ", err);

        return reject({
          code: 500,
          message: "Internal Server Error"
        });
      });
  });

}
