
module.exports.routes = {
    // '/': {
    //   controller: 'UserController',
    //   action: 'homepage'
    // },

    'get /user/signup': {
      controller: 'UserController',
      action: 'signUp'
    },
    'get /user/:userId/userDashboard': {
      controller: 'UserController',
      action: 'getDashboard'
    },
    'get /user/:userId/profile': {
      controller: 'UserController',
      action: 'getProfile'
    },
    'post /user/register': {
      controller: 'UserController',
      action: 'userRegistration'
    },
    'get /user/logout': {
      controller: 'UserController',
      action: 'logoutUser'
    },
    'post /user/login': {
      controller: 'UserController',
      action: 'loginUser'
    },
    'get /user/:userId/getUserForId': {
      controller: 'UserController',
      action: 'getUserForId'
    }
};
