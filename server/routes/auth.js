const express = require('express');
const router = express.Router();

// import controller
const { signup, signin, accountActivation } = require('../controllers/auth');

// import validators
const {
  userSignupValidator,
  userSigninValidator
} = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.post('/account-activation', accountActivation);

module.exports = router;
