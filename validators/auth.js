const { check } = require('express-validator');

exports.userSignupValidator = [
  check('employeeId').not().isEmpty().withMessage('Employee Id is Required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  check('firstName').not().isEmpty().withMessage('First Name is Required'),
  check('lastName').not().isEmpty().withMessage('Last Name is Required'),
  check('workEmail')
    .isEmail()
    .withMessage('Must be a valid Work email address'),
  check('workPhone').not().isEmpty().withMessage('Work Phone is Required'),
  check('personalEmail')
    .isEmail()
    .withMessage('Must be a valid Personal email address'),
  check('workAddress').not().isEmpty().withMessage('Work Address is Required'),
  check('personalAddress')
    .not()
    .isEmpty()
    .withMessage('Home Address is Required'),
  check('company').not().isEmpty().withMessage('Company is Required'),
  check('section').not().isEmpty().withMessage('Section is Required'),
  check('jobTitle').not().isEmpty().withMessage('Job Title is Required'),
  check('authLevel').not().isEmpty().withMessage('Authority Level is Required'),
  check('superiorEmployeeId')
    .not()
    .isEmpty()
    .withMessage('Superior Employee ID is Required'),
  check('dob').not().isEmpty().withMessage('Date of Birth is Required')
];

exports.userSigninValidator = [
  check('employeeId').not().isEmpty().withMessage('Employee Id is Required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

exports.forgotPasswordValidator = [
  check('workEmail')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
  check('newPassword')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];
