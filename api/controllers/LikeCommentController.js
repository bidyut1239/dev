/**
 * LikeCommentController
 *
 * @description :: Server-side logic for managing likecomments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	likeComment: likeCommentAction,
	getCommentLikes: getCommentLikesAction
};

function likeCommentAction (req, res){
		var createQuery = req.params.all();
		LikeComment
			.likeComment(createQuery)
			.then(function (likeComment){
				var conversationId = createQuery.conversation;
				var commentQuery = {
					conversation: conversationId
					// user: userId
				};
				LikeComment
					.getLike(commentQuery)
					.then(function (likes) {
						console.log("getCommentLikesAction::Controller " + likes);
							console.log("Likes::Length " + likes.length);
							var wholeLike = {
								likes: likes,
								conversationId: conversationId
							};
							var userId = req.session.user.id;
						var commentQueryUser = {
							conversation: conversationId,
							user: userId
						}

						return [wholeLike, LikeComment.getLike(commentQueryUser)];

					})
					.spread(function (wholeLike, likeUser) {
							wholeLike.likeUser = likeUser;
							return res.json(wholeLike);
					})
					.catch(function (err) {
						console.log("getCommentLikesAction::Controller::Error " + JSON.stringify(err));
						return res.json(err);

					});
			})
			.catch(function (err){
				console.log("LikeComment::Controller " + JSON.stringify(err));
				return res.json(err);
			})
}

function getCommentLikesAction(req, res) {
	var conversationId = req.param("conversationId");
	var userId = req.session.user.id;
	var commentQuery = {
		conversation: conversationId
		// user: userId
	};
	LikeComment
		.getLike(commentQuery)
		.then(function (likes) {
			console.log("getCommentLikesAction::Controller " + likes);
				console.log("Likes::Length " + likes.length);
				var wholeLike = {
					likes: likes,
					conversationId: conversationId
				};


			return res.json(wholeLike);

		})
		.catch(function (err) {
			console.log("getCommentLikesAction::Controller::Error " + JSON.stringify(err));
			return res.json(err);

		});
}
