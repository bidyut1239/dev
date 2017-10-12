/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
 'use strict';

var jsonwebtoken = require('jsonwebtoken');

 module.exports = function (req, res, next) {
   // console.log('req.isAuthenticated()***************', req.isAuthenticated());
  //  if (req.isAuthenticated()) {
  //    console.log("Inside This");
  //    return next();
  //  }
  //  else{
  //    console.log('99999999999999999999999');
  //    req.logout();
   //
   //
  //    return res.redirect('/user/new/login');
  //  }
  console.log("req.headers.authorization:: " + req.headers.authorization);
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIS', function (err, decode) {

        if (err) {
          req.user = undefined;
        }
        req.user = decode;
        next();
      });
    }
    else
      {
        req.user = undefined;
        next();
      }
    }
