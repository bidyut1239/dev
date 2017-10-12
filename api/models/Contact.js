/**
 * Contact.js
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
    phone: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true
    },
    message: {
      type: 'string',
      required: true
    }
  },
  createContact: createContact,
  getAllContacts: getAllContacts,
  showContactDetails: showContactDetails,
  deleteContact: deleteContact,
  removeContact: removeContact
};

function createContact(contactDetails) {
  return Q.promise(function (resolve, reject) {
    Contact
      .create(contactDetails)
      .then(function (contactDetailsResponse) {
        // create new profile
        console.log("createdUser:: " + JSON.stringify(contactDetailsResponse));
        return resolve(contactDetailsResponse);
      })
      .catch(function (err) {
        sails.log.error('User#createNewUserV2 :: Error while creating a new user :: ', err);
        err.message = "Unable to create contact";
        return reject(err);
      });
  });
}

function getAllContacts() {
  return Q.promise(function(resolve, reject) {
    Contact
      .find()
      // success block
      .then(function(contacts) {
        // do other tasks with new admin
        return resolve(contacts);
      })
      // error block
      .catch(function(err) {
        sails.log.error("Admin#getContacts:: Error :: ", err);

        return reject(err);
      });
  });

}


function showContactDetails(contactId) {
  return Q.promise(function (resolve, reject) {
    if (!contactId) {
      sails.log.error('User#getUserForId :: User id is null');
      return reject({
        code: 400,
        message: 'CONTACT_ID_NOT_FOUND'
      });
    }
    // criteria to load active user
    var criteria = {
      id: contactId
    };
    Contact
      .findOne(criteria)
      .then(function (contact) {
        if (!contact) {
          return reject({
            code: 404,
            message: 'CONTACT_NOT_FOUND'
          });
        } else {
          console.log("contactDetails::Model " + contact);
          // convert the user
          return resolve(contact);
        }
      })
      .catch(function (err) {
        // caught the error
        sails.log.error('Contact#DetailsModel :: Error in query :: ', err);

        return reject(err);
      });
  });
}

function deleteContact(contactId) {
    return Q.promise(function (resolve, reject) {
      var criteria = {
        id: contactId
      };
      Contact
        .findOne(criteria)
        .then(function (contact) {
          if (!contact) {
            return reject({
              code: 404,
              message: 'Contact not found'
            });
          } else {
            console.log("Model::contactFoundNow " + contact);

            // convert the user
            return Contact
                      .removeContact(contactId)
                      .then(resolve)
                      .catch(function(err) {
                        sails.log.error("Contact#removeContact:: Error :: ", err);
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

function removeContact(id) {
  return Q.promise(function(resolve, reject) {
    Contact
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
