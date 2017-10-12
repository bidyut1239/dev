/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		createEvent: createEventAction,
		getEventsForId: getEventsForIdAction,
		getAllEvents: getAllEventsAction,
		showEventDetails: showEventDetailsAction,
		editEvent: editEventAction,
		deleteEvent: deleteEventAction,
		eventQueryFilter: eventQueryFilterAction
};

function createEventAction(req, res) {
	var eventDetails = req.params.all();
	var user = req.session.user;
	console.log("eventDetails::createEventAction " + eventDetails.type);
	eventDetails.user = user;
	Event
    .createEvent(eventDetails)
    .then(function (event) {
      // redirect to show page
			// console.log("User:: " + users.length);
			return [event, User.getUserForId(req.session.user.id)];
    })
		.spread(function (event, user) {
			event.user = user;
			console.log("createEventAction::user " + JSON.stringify(event));
			return res.json(event);
		})
    /**
     * err = {
     *   code: ""
     *   message: ""
     * }
     */
    .catch(function (err) {
      var errors = err.message;
			console.log("EventController::errors " + errors);
			return res.json(err);
    });
}
//
function getEventsForIdAction(req, res) {

		var userId = req.param("userId");
		// console.log("UserId::Authorization " + userId);
		// var ex = {
		// 	id: userId
		// };
		// return res.json(ex);
		Event
			.getEventsForUserId(userId)
			.then(function (events) {
					return res.json(events);
			})
			.catch(function (err) {
				console.log("getEventsForIdAction::errors " + errors);
				return res.json(err);
			});
}

function getAllEventsAction(req, res) {

		// var userId = req.param("userId");
		// console.log("UserId::Authorization " + userId);
		// var ex = {
		// 	id: userId
		// };
		// return res.json(ex);
		Event
			.getAllEvents()
			.then(function (allEvents) {
					return [allEvents, City.getAllCities()];
			})
			.spread(function (allEvents, allCities) {
				var events = {
					allEvents: allEvents,
					allCities: allCities
				}
				return res.json(events);
			})
			.catch(function (err) {
				console.log("getEventsForIdAction::errors " + errors);
				return res.json(err);
			});
}

function showEventDetailsAction(req, res) {
	var eventId = req.param("eventId");
	var userId = req.session.user.id;
	console.log("showEventDetailsAction::controller " + userId);
	var like = "like";
	var dislike = "dislike";
	Event
		.getEventForId(eventId, userId)
		.then(function (event) {
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
			return [event, City.getAllCities(), Like.getAllLike(criteriaLike), Like.getAllLike(criteriaDislike), Like.getAllLike(criteriaUserSpecific)];
			})
		.spread(function (event, cities, likes, dislikes, likeDislikeUserSpecific) {
			console.log("User::accessToken " + JSON.stringify(likes));
			event.allCities = cities;
			event.likes = likes;
			event.dislikes = dislikes;
			event.likeDislikeUserSpecific = likeDislikeUserSpecific;
			return res.json(event);

		})
		.catch(function (err) {
			sails.log.error('showEventDetailsAction:: Error :: ', err);
			// check for the error code and accordingly send the response

			return res.json(err);
		});
}

function editEventAction(req, res) {
		var eventId = req.param("eventId");
		var eventDetails = req.params.all();
		Event
			.editEvent(eventId)
			.then(function (event) {
				console.log("EventType::Controller " + eventDetails.type);
				event.name = eventDetails.name;
				event.venue = eventDetails.venue;
				event.city = eventDetails.city;
				event.country = eventDetails.country;
				event.type = eventDetails.type;
				event.date = eventDetails.date;
				event.time = eventDetails.time;
				event.address = eventDetails.address;
				event.price = eventDetails.price;
				event.details = eventDetails.details;
				event.save();
				console.log("Event::Controller " + JSON.stringify(event));

			return res.json(event);
			})
			.catch(function (err) {
				sails.log.error('Event::Controller::Error ', err);
				// check for the error code and accordingly send the response

				return res.json(err);
			});
}

function deleteEventAction(req, res) {
		var eventId = req.param("eventId");
		Event
			.deleteEvent(eventId)
			.then(function () {
				var response = {
						message: "Event deleted successfully",
						id: eventId
				};
				return res.json(response);
			})
			.catch(function (err) {
				return res.json(err);
			});
}

function eventQueryFilterAction(req, res) {
		var eventQuery = req.params.all();
		console.log("filteredQuery::Controller:: " + JSON.stringify(eventQuery));
		Event
			.getEventQuery(eventQuery)
			.then(function (filteredQuery) {
				return res.json(filteredQuery);
			})
			.catch(function (err) {
				return res.json(err);
			});
}
