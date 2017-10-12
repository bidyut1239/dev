/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
UserController: {
  // registerUser: ["validation/User/RegistrationValidation"],
  logoutUser: ["sessionAuth","isAuthorized"],
  getDashboard: ["sessionAuth","isAuthorized"],
  getUserForId: ["sessionAuth","isAuthorized"]
},

AdminController: {
  getAdminDashboard: ["sessionAuth","isAuthorized","isAdminAuthenticated"],
  showAllUsers: ["sessionAuth","isAuthorized","isAdminAuthenticated"],
  showUserDetails: ["sessionAuth","isAuthorized","isAdminAuthenticated"]
},
EventController: {
  createEvent:  ["sessionAuth","isAuthorized"],
  getEventsForId: ["sessionAuth","isAuthorized"],
  getAllEvents: ["sessionAuth","isAuthorized"],
  showEventDetails: ["sessionAuth","isAuthorized"],
  editEvent: ["sessionAuth","isAuthorized"],
  deleteEvent: ["sessionAuth","isAuthorized"],
  eventQueryFilter: ["sessionAuth","isAuthorized"]
},
ConversationController: {
  submitComment: ["sessionAuth","isAuthorized"],
  getAllCommentsForEvent: ["sessionAuth","isAuthorized"]
},
ContactController: {
  createContact: [],
  getAllContacts: ["sessionAuth","isAuthorized","isAdminAuthenticated"],
  showContactDetails:  ["sessionAuth","isAuthorized","isAdminAuthenticated"],
  deleteContact: ["sessionAuth","isAuthorized","isAdminAuthenticated"]
},
CityController: {
  createCity: ["sessionAuth","isAuthorized","isAdminAuthenticated"],
  getAllCities: ["sessionAuth","isAuthorized"],
  deleteCity: ["sessionAuth","isAuthorized","isAdminAuthenticated"]
},
LikeController: {
  likeDislikeEvent: ["sessionAuth","isAuthorized"],
  undoLikeDislikeEvent: ["sessionAuth","isAuthorized"]
},
LikeCommentController: {
  likeComment: ["sessionAuth","isAuthorized"]
}
};
