/**
 * LikeController
 *
 * @description :: Server-side logic for managing likes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	likeDislikeEvent: likeDislikeEventAction,
	undoLikeDislikeEvent: undoLikeDislikeEventAction
};

function likeDislikeEventAction(req, res) {
	var likeDislikeEvent = req.params.all();
	var userId = likeDislikeEvent.user;
	var eventId = likeDislikeEvent.event;
	var like = "like";
	var dislike = "dislike";
	console.log("likeDislikeEvent::Controller " + JSON.stringify(likeDislikeEvent));
	Like
		.likeDislikeEvent(likeDislikeEvent)
		.then(function (info) {
			var criteriaLike = {
				islike: like,
				event: eventId,
			};
			var criteriaDislike = {
				islike: dislike,
				event: eventId,
			};
			var criteriaUserSpecific = {
				event: eventId,
				user: userId
			};
			return [info, Like.getAllLike(criteriaLike), Like.getAllLike(criteriaDislike), Like.getAllLike(criteriaUserSpecific)];
		})
		.spread(function (info, likes, dislikes, likeDislikeUserSpecific) {
			console.log("likeDislikeUserSpecific::Controller " + likeDislikeUserSpecific.length);
			info.likes = likes;
			info.dislikes = dislikes;
			info.likeDislikeUserSpecific = likeDislikeUserSpecific;
			return res.json(info);
		})
		.catch(function (err) {
			console.log("likeDislikeEvent::Controller " + JSON.stringify(err));
			return res.json(err);
		});
}

function undoLikeDislikeEventAction(req, res) {
	var undoLikeDislikeEvent = req.params.all();
	var userId = undoLikeDislikeEvent.user;
	var eventId = undoLikeDislikeEvent.event;
	var isLike = undoLikeDislikeEvent.islike;
	var like = "like";
	var dislike = "dislike";
	var criteria = {
		islike: isLike,
		event: eventId,
		user: userId
	};
	Like
		.undoLike(criteria)
		.then(function () {
			var criteriaLike = {
				islike: like,
				event: eventId,
			};
			var criteriaDislike = {
				islike: dislike,
				event: eventId,
			};
			var criteriaUserSpecific = {
				event: eventId,
				user: userId
			};
			var undoLike = {};
			return [undoLike, Like.getAllLike(criteriaLike), Like.getAllLike(criteriaDislike), Like.getAllLike(criteriaUserSpecific)];
		})
		.spread(function (undoLike,  likes, dislikes, likeDislikeUserSpecific) {
			console.log("undoLikeDislikeUserSpecific::Controller " + likeDislikeUserSpecific.length);
			undoLike.likes = likes;
			undoLike.dislikes = dislikes;
			undoLike.likeDislikeUserSpecific = likeDislikeUserSpecific;
			return res.json(undoLike);
		})
		.catch(function (err) {
			console.log("UndoLike::Controller::Error " + JSON.stringify(err.message));
		});

}
