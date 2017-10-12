/**
 * LikeComment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 'use strict';

 var Q = require('q');

module.exports = {

  attributes: {
    user: {
      model: 'User'
    },
    conversation: {
      model: 'Conversation'
    }
  },

  likeComment: likeComment,
  getLike: getLike

};

function likeComment(query) {
    return Q.promise(function(resolve, reject) {
        console.log("Before:: " + query);
        LikeComment
          .create(query)
          .then(function (infoDetails) {
            // create new profile
            // console.log("likeComment::Model " + JSON.stringify(infoDetails));
            return resolve(infoDetails);
          })
          .catch(function (err) {
            // console.log('likeComment::Error::Model ', err);
            return reject(err);
          });
    });
}

function getLike(criteria) {
    return Q.promise(function(resolve, reject) {
        // console.log("Before:: " + eventId);

        LikeComment
          .find(criteria)
          .populate(["conversation", "user"])
          .then(function (likes) {
            // create new profile
            console.log("getLike::Model " + likes.length);
            return resolve(likes);
          })
          .catch(function (err) {
            console.log('getAllLike::Error::Model ', err);
            return reject(err);
          });
    });
}
