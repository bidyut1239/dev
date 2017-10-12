/**
 * Conversation.js
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
 		event: {
       model: 'Event'
     },
     comment: {
       type: 'string',
       required: true
     }
   },
 	createConversation: createConversation,
  getAllCommentsForEvent: getAllCommentsForEvent
 };

 function createConversation(submitDetails) {
   return Q.promise(function(resolve, reject) {
      //  console.log("createConversation::model " + submitDetails.comment);
       Conversation
         .create(submitDetails)
         .then(function (submitDetailsResponse) {
           // create new profile
          //  console.log("createdUser::model " + JSON.stringify(submitDetailsResponse));
           return resolve(submitDetailsResponse);
         })
         .catch(function (err) {
           sails.log.error('User#createNewUserV2 :: Error while creating a new user :: ', err);
           return reject(err);
         });
   });
 }

 function getAllCommentsForEvent(eventId) {
   return Q.promise(function(resolve, reject) {
       // console.log("Before:: " + eventDetails.name);
       var criteria = {
         event: eventId
       };
       var i = 0;
       // return resolve(criteria);
       Conversation
         .find(criteria)
         .populate(['event','user'])
         .then(function (conversations) {
           
             return resolve(conversations);
           })
         .catch(function (err) {
           sails.log.error('User#createNewUserV2 :: Error while creating a new user :: ', err);
           return reject(err);
         });
   });
 }
