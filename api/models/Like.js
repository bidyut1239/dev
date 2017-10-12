/**
 * Like.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 'use strict';

 var Q = require('q');

module.exports = {

  attributes: {
    islike: {
      type: 'string',
      required: true
    },
    user: {
      model: 'User'
    },
    event: {
      model: 'Event'
    }
  },

  likeDislikeEvent: likeDislikeEvent,
  getAllLike: getAllLike,
  undoLike: undoLike,
  removeLike: removeLike

};

function likeDislikeEvent(info) {
    return Q.promise(function(resolve, reject) {
        console.log("Before:: " + info);
        Like
          .create(info)
          .then(function (infoDetails) {
            // create new profile
            console.log("likeDislikeEvent::Model " + JSON.stringify(infoDetails));
            return resolve(infoDetails);
          })
          .catch(function (err) {
            console.log('likeDislikeEvent::Error::Model ', err);
            return reject(err);
          });
    });
}

function getAllLike(criteria) {
    return Q.promise(function(resolve, reject) {
        // console.log("Before:: " + eventId);

        Like
          .find(criteria)
          .populate("event")
          .then(function (likes) {
            // create new profile
            console.log("getAllLike::Model " + likes.length);
            return resolve(likes);
          })
          .catch(function (err) {
            console.log('getAllLike::Error::Model ', err);
            return reject(err);
          });
    });
}

function undoLike(criteria) {
    return Q.promise(function (resolve, reject) {

      Like
        .findOne(criteria)
        .then(function (like) {
          if (!like) {
            return reject({
              code: 404,
              message: 'Like not found'
            });
          } else {
            // console.log("Model::EventFoundNow " + event);
            var likeId = like.id;
            // convert the user
            return Like
                      .removeLike(likeId)
                      .then(resolve)
                      .catch(function(err) {
                        sails.log.error("Event#removeEvent:: Error :: ", err);
                        return reject({
                          code: 500,
                          message: "Internal Server Error"
                        });
                      });
          }
        })
        .catch(function (err) {
          // caught the error
          sails.log.error('User#getUserForId :: Error in query :: ', err);
          err.message = "Internal server error";

          return reject(err);
        });
    });
}

function removeLike(id) {
  return Q.promise(function(resolve, reject) {
    Like
      .destroy(id)
      // success block
      .then(function() {
        // do other tasks with new admin
        return resolve();
      })
      // error block
      .catch(function(err) {
        sails.log.error("User#removeUser:: Error :: ", err);

        return reject({
          code: 500,
          message: "Internal Server Error"
        });
      });
  });

}
