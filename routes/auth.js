const express = require('express');
const router = express.Router();

// import controller
const {
  signup,
  signin,
  accountActivation,
  forgotPassword,
  resetPassword
} = require('../controllers/auth');

// import validators
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../validators/auth');

const { runValidation } = require('../validators');

// routes for authentication
router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.post('/account-activation', accountActivation);

//forgot/reset password routes
router.put(
  '/forgot-password',
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  '/reset-password',
  resetPasswordValidator,
  runValidation,
  resetPassword
);

module.exports = router;
