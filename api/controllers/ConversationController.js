/**
 * ConversationController
 *
 * @description :: Server-side logic for managing conversations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



 module.exports = {
 		submitComment: submitCommentAction,
		getAllCommentsForEvent: getAllCommentsForEventAction
 };

function submitCommentAction(req, res) {
		var commentDetails = req.params.all();
		// console.log("commentDetails:: " + JSON.stringify(commentDetails));
		Conversation
			.createConversation(commentDetails)
			.then(function(comment) {
				// console.log("Comment::Controller " + JSON.stringify(comment));
				return res.json(comment);
			})
			.catch(function(err) {
				return res.json(err);
			});
}

function getAllCommentsForEventAction(req, res) {

		var eventId = req.param("eventId");
		console.log("EventId::Authorization " + eventId);
		// var ex = {
		// 	id: userId
		// };
		// return res.json(ex);
		Conversation
			.getAllCommentsForEvent(eventId)
			.then(function (conversations) {
					// console.log("getEventsForIdAction::Controller " + JSON.stringify(conversations));
					return res.json(conversations);
			})
			.catch(function (err) {
				console.log("getEventsForIdAction::errors " + errors);
				return res.json(err);
			});
}
