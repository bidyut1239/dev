'use strict';

var form = require('express-form'),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('firstName'),
  field('lastName'),
  field('email'),
  field('password'),
  field('confirmPassword'),
  field('type'),
  validate('email')
    .required("", "REGISTRATION_EMAIL_REQUIRED")
    .isEmail("REGISTRATION_INVALID_EMAIL"),
  validate('password')
    .required("", "REGISTRATION_PASSWORD_REQUIRED")
    .minLength(8, "REGISTRATION_PASSWORD_MIN_LENGTH"),
  // validate('phone')
  //   .isNumeric("PHONE_MUST_BE_NUMBER")
  //   .required("", "REGISTRATION_PHONE_NO_REQUIRED")
  //   .minLength(10, "REGISTRATION_PHONE_MIN_LENGTH")
  //   .maxLength(10, "REGISTRATION_PHONE_MAX_LENGTH"),
  validate('confirmPassword')
    .required("", "REGISTRATION_PASSWORD_REQUIRED")
    .minLength(8, "REGISTRATION_PASSWORD_MIN_LENGTH"),
  validate('firstName')
    .required("", "NAME_REQUIRED"),
  validate('lastName')
    .required("", "NAME_REQUIRED"),
  validate('type')
    .required("", "NAME_REQUIRED")
  // validate('confirmPassword')
  //   .required("", "PASSWORD_SHOULD_BE_CONFIRMED")
  //   // .equals('field::password', "RESETPASSWORD_CONFIRM_PASSWORD_MISMATCH")



);
