/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		getAdminDashboard: getAdminDashboardAction,
		showAllUsers: showAllUsersAction,
		showUserDetails: showUserDetailsAction
};

function getAdminDashboardAction(req, res) {
	  var userId = req.param("userId");
		User
			.getUserForId(userId)
			.then(function (user) {
				// console.log("userId:: " + req.session.accessToken);
				var viewResponse = {
						user: user,
						userInfo: "Role Admin",
						layout: "dashBoard",
						accessToken: req.session.accessToken
				};
				// req.flash("message", "Your are Successfully signed up, to continue please log in");
				return res.view('admin/adminDashboard', viewResponse);
			})
			.catch(function (err) {
	      sails.log.error('UserController#registerAction :: Error registering user :: ', err);
	      // check for the error code and accordingly send the response
	      var errors = err.message;

	      req.flash("errors", errors);
				return res.redirect('/user/signup');

	    });

}

function showAllUsersAction(req, res) {

  User
    .getAllUsers()
    .then(function (users) {
      // redirect to show page
			// console.log("User:: " + users.length);
				return res.json(users);
    })

    .catch(function (err) {
      var errors = err.message;

			return res.json(err);
    });

}

function showUserDetailsAction(req, res) {
	var userId = req.param("userId");
	User
		.getUserForId(userId)
		.then(function (user) {
			console.log("User::accessToken " + user);
			var viewResponse = {
				user: user,
				accessToken: req.session.accessToken,
				layout: "dashBoard"
		};
		return res.json(viewResponse);
		})
		.catch(function (err) {
			sails.log.error('UserController#registerAction :: Error registering user :: ', err);
			// check for the error code and accordingly send the response
			var errors = err.message;

			req.flash("errors", errors);
			return res.json(err);
		});
}
