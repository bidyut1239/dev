module.exports = AdminAuthorized;

function AdminAuthorized (req, res, next) {
  if (req.session.isAdminAuthenticated = "true") {
    console.log('req.isAuthenticated()***************', req.session.isAdminAuthenticated);
    // req.userRole = req.user.role.name;
    // console.log('req.user*******************************************',req.user);
    // console.log(req.userRole);
    return next();
  }
  else{
    // console.log('99999999999999999999999')
    // req.logout();


    return res.redirect('/user/signup');
  }
}
