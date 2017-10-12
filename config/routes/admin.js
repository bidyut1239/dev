module.exports.routes = {

'get /admin/:userId/userAdminDashboard': {
  controller: 'AdminController',
  action: 'getAdminDashboard'
},

'get /user/showAllUsers': {
  controller: 'AdminController',
  action: 'showAllUsers'
},

'get /admin/:userId/showUserDetails': {
  controller: 'AdminController',
  action: 'showUserDetails'
}

};
