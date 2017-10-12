module.exports.routes = {

    'post /like/likeComment': {
      controller: 'LikeCommentController',
      action: 'likeComment'
    },
    'get /likeComment/:conversationId/getCommentLikes': {
      controller: 'LikeCommentController',
      action: 'getCommentLikes'
    }
};
