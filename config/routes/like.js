module.exports.routes = {

    'post /like/likeDislikeEvent': {
      controller: 'LikeController',
      action: 'likeDislikeEvent'
    },
    'post /like/undoLikeDislikeEvent': {
      controller: 'LikeController',
      action: 'undoLikeDislikeEvent'
    }
};
