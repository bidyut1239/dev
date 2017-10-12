module.exports = Authorized;

function Authorized (req, res, next) {
  if (req.session.isAuthenticated) {
    console.log('req.isAuthenticated()***************', req.session.isAuthenticated);
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
};
