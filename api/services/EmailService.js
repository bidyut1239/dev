var mailerConfig = sails.config.mailer;

module.exports = {
  sendRegistrationEmail: sendRegistrationEmail,
  sendResetPasswordEmail: sendResetPasswordEmail,
  sendSignupEmail: sendSignupEmail,
  sendSigninEmail: sendSigninEmail,

};

function sendResetPasswordEmail(user) {
  // construct route
  var hostName = mailerConfig.hostName,
    resetPasswordLink = hostName + '/#/forgotPasswordReset/' + encodeURIComponent(user.email) + '/' + user.uniqueKey;
  sails.renderView('emailTemplates/resetPassword', {
    layout: false,
    link: resetPasswordLink
  }, function(err, view) {
    if (err) {
      sails.log.error('Email template rendering error', err);
    } else {
      // Change all the values to configurable options
      // Log messages
      var mailOptions = {
          from: mailerConfig.sender,
          to: user.email,
          subject: 'Request for reset password',
          html: view
        },
        mailer = mailerConfig.contactAccount;

      // send mail with defined transport object
      mailer.sendMail(mailOptions, function(error, info) {
        if (error) {
          sails.log.error('Mailer error', error);
        }
        sails.log.info('Message sent: ', info);
      });
    }
  });

  return;
}

function sendRegistrationEmail(user) {
  // construct route
  var hostName = mailerConfig.hostName,
    activationLink = hostName + '/#/mailActivationSuccess/' + encodeURIComponent(user.email) + "/" + user.systemUniqueKey;

  // get the template for the email
  sails.renderView('emailTemplates/accountActivation', {
    // layout should be false, if you only need the partial
    layout: false,
    link: activationLink
  }, function(err, view) {
    if (err) {
      sails.log.error('Email template rendering error', err);
    } else {
      // Change all the values to configurable options
      // Log messages
      var mailer = mailerConfig.contactAccount,
        mailOptions = {
          from: mailerConfig.sender,
          to: user.email,
          subject: 'Account Activation',
          html: view
        };

      // send email
      mailer.sendMail(mailOptions, function(error, info) {
        if (error) {
          sails.log.error('Mailer error', error);
        }
        sails.log.info('Message sent: ', info);
      });
    }
  });

  return;
}


function sendSignupEmail(user) {
  // construct route
  var hostName = mailerConfig.hostName,
    activationLink = hostName + '/#/home/' + encodeURIComponent(user.email) + "/" + user.systemUniqueKey;

  // get the template for the email
  sails.renderView('emailTemplates/accountSignup', {
    // layout should be false, if you only need the partial
    layout: false,
    link: activationLink
  }, function(err, view) {
    if (err) {
      sails.log.error('Email template rendering error', err);
    } else {
      // Change all the values to configurable options
      // Log messages
      var mailer = mailerConfig.contactAccount,
        mailOptions = {
          from: mailerConfig.sender,
          to: user.email,
          subject: 'Account Signup',
          html: view
        };

      // send email
      mailer.sendMail(mailOptions, function(error, info) {
        if (error) {
          sails.log.error('Mailer error', error);
        }
        sails.log.info('Message sent: ', info);
      });
    }
  });

  return;
}


function sendSigninEmail(user) {
  // construct route
  var hostName = mailerConfig.hostName,
    activationLink = hostName + '/#/home/' + encodeURIComponent(user.email) + "/" + user.systemUniqueKey;

  // get the template for the email
  sails.renderView('emailTemplates/accountSignin', {
    // layout should be false, if you only need the partial
    layout: false,
    link: activationLink,
    userName: user.userWhoAdded,
    projectName: user.projectName
  }, function(err, view) {
    if (err) {
      sails.log.error('Email template rendering error', err);
    } else {
      // Change all the values to configurable options
      // Log messages
      var mailer = mailerConfig.contactAccount,
        mailOptions = {
          from: mailerConfig.sender,
          to: user.email,
          subject: 'Invitation to join the project',
          html: view
        };

      // send email
      mailer.sendMail(mailOptions, function(error, info) {
        if (error) {
          sails.log.error('Mailer error', error);
        }
        sails.log.info('Message sent: ', info);
      });
    }
  });

  return;
}
