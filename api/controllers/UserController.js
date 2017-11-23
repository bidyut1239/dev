/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var jwt = require('jsonwebtoken');
var jsonwebtoken = require('express-jwt');
module.exports = {
	  signUp: signUpAction,
		// homepage: homepageAction,
		// registerUser: registerUserAction,
		// getDashBoard: getDashBoardAction,
		userRegistration: userRegistrationAction,
		getDashboard: getDashboardAction,
		getProfile: getProfileAction,
		logoutUser: logoutUserAction,
    loginUser: loginUserAction,
		getUserForId: getUserForIdAction
};


function signUpAction(req, res) {
		return res.view('user/signup', {
			test: "dataa",
			layout: 'layout'
		});
}

function userRegistrationAction(req, res) {
	console.log("Here:: " + JSON.stringify(req.params.all()));
	User
    .registerUser(req.params.all())
    .then(function (user) {
			if(!user) {
				res.status(401).json({message: "Authentication failed. User not found."});
			}
      // send email to user to activate his mail
      //User.sendActivationMail(user);
      // User.sendActivationMail(user);

      req.flash('alert', "Open your registered email to verify the account");
			var userId = user.id;
			return res.redirect('/user/signup');
    })
    .catch(function (err) {
      sails.log.error('UserController#registerAction :: Error registering user :: ', err);
      // check for the error code and accordingly send the response
      var errors = err.message;

      req.flash("errors", errors);
			return res.redirect('/user/signUp');

    });
}

// function registerUserAction(req, res) {
//
//
// console.log("here ia mam inside register controller");
// 		// if(data) {
// 		// res.redirect('/user/userDashBoard');
// 		// res.redirect('www.google.com');
// 	// }
// 	// else {
// 	// 	console.log("Here Now");
// 	// 	res.redirect('/500');
// 	// }
// 		// User
// 		//   .create( req.params.all() )
// 		// 	.then(function (user) {
//     //   // send email to user to activate his mail
//     //   //User.sendActivationMail(user);
//     //   res.json(user);
//     // })
//     // .catch(function (err) {
// 		// 	if(err){
// 		// 			console.log("UserController::registerUserAction " + err);c
// 		// 			return res.redirect('/user/new');
// 		// 	}
//     // });
// }

function getDashboardAction(req, res) {
	  var userId = req.param("userId");
		User
			.getUserForId(userId)
			.then(function (user) {
				console.log("userId:: " + req.session.accessToken);
				var viewResponse = {
						user: user,
						userInfo: "Role User",
						layout: "dashBoard",
						accessToken: req.session.accessToken
				};
				// req.flash("message", "Your are Successfully signed up, to continue please log in");
				return res.view('user/userDashboard', viewResponse);
			})
			.catch(function (err) {
	      sails.log.error('UserController#registerAction :: Error registering user :: ', err);
	      // check for the error code and accordingly send the response
	      var errors = err.message;

	      req.flash("errors", errors);
				return res.redirect('/user/signup');

	    });

}

function getProfileAction(req, res) {
	var userId = req.param("userId");
	User
		.getUserForId(userId)
		.then(function (user) {
		// console.log("User:: " + req.session.user);
		var viewResponse = {
			user: user,
			layout: "dashBoard"
		};
		console.log("UserId::getProfileAction::Controller" + user.id);
		res.view("user/profile", viewResponse);
		})
		.catch(function (err) {
			sails.log.error('UserController#registerAction :: Error registering user :: ', err);
			// check for the error code and accordingly send the response
			var errors = err.message;

			req.flash("errors", errors);
			return res.redirect('/user/signup');
		});
}

function logoutUserAction(req, res) {

  // req.logOut();
	// console.log("Logging user out!:: " + JSON.stringify(req.session));
  // req.flash("message", 'Successfully logged out!');
  // res.redirect('/user/signUp');
	var message = {
		Success: "logged out"
	};
	req.session.isAuthenticated = "false";
	return res.json(message);

}

function loginUserAction(req, res) {
    var loginData = req.params.all();
		var email = loginData.email;
		var passPlain = loginData.password;
		var password = loginData.password;
		console.log("loginUserAction::Controller " + email);
		var privateKey = "DX8RmPnJI0z0heE0Pgz2i76zI0O3gfq_EK_D2jEuyvmz6XTreyrv8eD0OJ5kAMaR";
		User
			.getUserForEmail(email)
			.then(function (user){
				console.log("Here Login:: " + email);
					if(!user) {
						res.status(401).json({message: "Sorry, User not found"});
					}
					else if(user) {
						if(User.comparePassword(password, user.passPlain)) {
							var tokenData = {
						            firstName: user.firstName,
						            id: user._id
						        };
							var accessToken = jwt.sign(tokenData, privateKey);
							req.session.accessToken = accessToken;
							req.session.isAuthenticated = "true";
							req.session.user = user;
							if(email == "admin@gmail.com" && password == "password") {
									req.session.isAdminAuthenticated = "true";
									user.isLoggedIn = "true";
									user.save();
									// var viewResponse = {
									// 		user: user,
									// 		userInfo: "Role User",
									// 		layout: "dashBoard",
									// 		accessToken: accessToken
									// };
									var getAdminDashBoard = "/admin/" + user.id + "/userAdminDashboard";
									console.log("getDashBoard:: " + getDashBoard);
									var accessTokenjson = {
										accessToken: accessToken
									};
									res.redirect(getAdminDashBoard);
							}
							else {
									req.session.isAdminAuthenticated = "false";
									user.isLoggedIn = "true";
									user.save();
									// var viewResponse = {
									// 		user: user,
									// 		userInfo: "Role User",
									// 		layout: "dashBoard",
									// 		accessToken: accessToken
									// };
									var getDashBoard = "/user/" + user.id + "/userDashboard";
									console.log("getDashBoard:: " + getDashBoard);
									var accessTokenjson = {
										accessToken: accessToken
									};
									res.redirect(getDashBoard);
							}
							req.session.user = user;
 							// var tokenProvided = req.headers.authorization.split(' ')[0];
							// console.log("authorization:: " + JSON.stringify(req.headers));
							// if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
							// }
							// else {
							//
							// }


						}
						else {
							res.status(401).json({message: "Authentication Failed"});
						}
					}
			})

}

function getUserForIdAction(req, res) {
	var userId = req.param("userId");
	User
		.getUserForId(userId)
		.then(function(userDetails) {
			console.log("userDetails::Controller1 " + JSON.stringify(userDetails));
			return res.json(userDetails);
		})
		.catch(function(err) {
			console.log("userDetails::Controller2 " + JSON.stringify(err));
			return res.json(err);
		})
}
