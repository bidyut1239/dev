/* global Role */


var jwt = require('express-jwt');

var authCheck = jwt({
  secret: new Buffer('DX8RmPnJI0z0heE0Pgz2i76zI0O3gfq_EK_D2jEuyvmz6XTreyrv8eD0OJ5kAMaR', 'base64'),
  audience: 'xmoYpeuMSXh82birBYcXST2NlBIJyy3m'
});

module.exports = authCheck;
