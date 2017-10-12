
module.exports.routes = {
    // '/': {
    //   controller: 'UserController',
    //   action: 'homepage'
    // },

    'post /user/createEvent': {
      controller: 'EventController',
      action: 'createEvent'
    },
    'get /event/:userId/getEventsForId': {
      controller: 'EventController',
      action: 'getEventsForId'
    }
    ,
    'get /event/getAllEvents': {
      controller: 'EventController',
      action: 'getAllEvents'
    },
    'get /event/:eventId/showEventDetails': {
      controller: 'EventController',
      action: 'showEventDetails'
    },
    'post /event/:eventId/editEvent': {
      controller: 'EventController',
      action: 'editEvent'
    },
    'post /event/:eventId/deleteEvent': {
      controller: 'EventController',
      action: 'deleteEvent'
    },
    'post /event/eventQueryFilter': {
      controller: 'EventController',
      action: 'eventQueryFilter'
    }
};
