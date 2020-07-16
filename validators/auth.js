const { check } = require('express-validator');

exports.userSignupValidator = [
  check('name').not().isEmpty().withMessage('Name is Required'),
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

exports.userSigninValidator = [
  check('employee_id').not().isEmpty().withMessage('Employee Id is Required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

exports.forgotPasswordValidator = [
  check('email')
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
