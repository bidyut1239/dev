module.exports.routes = {

    'post /comment/submitComment': {
      controller: 'ConversationController',
      action: 'submitComment'
    },

    'get /conversation/:eventId/getAllCommentsForEvent': {
      controller: 'ConversationController',
      action: 'getAllCommentsForEvent'
    }
};
