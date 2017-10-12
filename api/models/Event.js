/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 'use strict';

 var Q = require('q');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    venue: {
      type: 'string',
      required: true
    },
    city: {
      type: 'string',
      required: true
    },
    country: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      required: true
    },
    date: {
      type: 'date',
      required: true
    },
    time: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    details: {
      type: 'string',
      required: true
    },
    price: {
      type: 'integer',
      required: true
    },
    user: {
      model: 'User'
    }
  },

  createEvent: createEvent,
  getEventsForUserId: getEventsForUserId,
  getAllEvents: getAllEvents,
  getEventForId: getEventForId,
  editEvent: editEvent,
  deleteEvent: deleteEvent,
  removeEvent: removeEvent,
  getEventQuery: getEventQuery
};

function createEvent(eventDetails) {
    return Q.promise(function(resolve, reject) {
        console.log("Before:: " + eventDetails.name);
        Event
          .create(eventDetails)
          .then(function (eventDetails) {
            // create new profile
            // console.log("createdUser:: " + JSON.stringify(eventDetails));
            return resolve(eventDetails);
          })
          .catch(function (err) {
            sails.log.error('User#createNewUserV2 :: Error while creating a new user :: ', err);
            return reject(err);
          });
    });
}

function getEventsForUserId(userId) {
  return Q.promise(function(resolve, reject) {
      // console.log("Before:: " + eventDetails.name);
      var criteria = {
        user: userId
      };
      // return resolve(criteria);
      Event
        .find(criteria)
        .populate("user")
        .then(function (events) {
          // create new profile
          // console.log("createdUser:: " + JSON.stringify(events));
          return resolve(events);
        })
        .catch(function (err) {
          sails.log.error('User#createNewUserV2 :: Error while creating a new user :: ', err);
          return reject(err);
        });
  });
}

function getAllEvents() {
  return Q.promise(function(resolve, reject) {
    Event
      .find()
      .populate("user")
      // success block
      .then(function(allEvents) {
        // do other tasks with new admin
        return resolve(allEvents);
      })
      // error block
      .catch(function(err) {
        sails.log.error("Admin#getAllUsers:: Error :: ", err);

        return reject(err);
      });
  });

}

function getEventForId(eventId) {
  return Q.promise(function (resolve, reject) {
    if (!eventId) {
      sails.log.error('User#getUserForId :: User id is null');
      return reject({
        code: 400,
        message: 'USER_INVALID_REQUEST'
      });
    }
    // criteria to load active user
    var criteria = {
      id: eventId
    };
    Event
      .findOne(criteria)
      .populate("user")
      .then(function (event) {
        if (!event) {
          return reject({
            code: 404,
            message: 'EVENT_NOT_FOUND'
          });
        } else {
          // console.log("Model::Event::Stringify " + JSON.stringify(event));
          // convert the user
          return resolve(event);
        }
      })
      .catch(function (err) {
        // caught the error
        sails.log.error('User#getUserForId :: Error in query :: ', err);

        return reject(err);
      });
  });
}


function editEvent(eventId) {
    return Q.promise(function (resolve, reject) {
      var criteria = {
        id: eventId
      };
      Event
        .findOne(criteria)
        .then(function (event) {
          if (!event) {
            return reject({
              code: 404,
              message: 'EVENT_NOT_FOUND'
            });
          } else {
            console.log("Model:: " + event);
            // convert the user
            return resolve(event);
          }
        })
        .catch(function (err) {
          // caught the error
          sails.log.error('User#getUserForId :: Error in query :: ', err);

          return reject(err);
        });
    });
}


function deleteEvent(eventId) {
    return Q.promise(function (resolve, reject) {
      var criteria = {
        id: eventId
      };
      Event
        .findOne(criteria)
        .then(function (event) {
          if (!event) {
            return reject({
              code: 404,
              message: 'Event not found'
            });
          } else {
            // console.log("Model::EventFoundNow " + event);

            // convert the user
            return Event
                      .removeEvent(eventId)
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

function removeEvent(id) {
  return Q.promise(function(resolve, reject) {
    Event
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

function getEventQuery(eventQuery) {
  return Q.promise(function(resolve, reject) {
    Event
      .find(eventQuery)
      .populate("user")
      // success block
      .then(function(filteredEvents) {
        // do other tasks with new admin
        return resolve(filteredEvents);
      })
      // error block
      .catch(function(err) {
        sails.log.error("Admin#getAllUsers:: Error :: ", err);

        return reject(err);
      });
  });

}
