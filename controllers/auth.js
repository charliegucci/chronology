const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const _ = require('lodash');

exports.signup = (req, res) => {
  const {
    employeeId,
    workEmail,
    firstName,
    lastName,
    password,
    workPhone,
    workAddress,
    personalEmail,
    personalPhone,
    personalAddress,
    company,
    section,
    jobTitle,
    authLevel,
    superiorEmployeeId,
    dob
  } = req.body;

  User.findOne({ employeeId }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Employee ID is already registered'
      });
    }

    const token = jwt.sign(
      {
        employeeId,
        workEmail,
        firstName,
        lastName,
        password,
        workPhone,
        workAddress,
        personalEmail,
        personalPhone,
        personalAddress,
        company,
        section,
        jobTitle,
        authLevel,
        superiorEmployeeId,
        dob
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '10m' }
    );

    const emailData = {
      from: process.env.EMAIL_TO,
      to: workEmail,
      subject: `Account activation link`,
      html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
    };

    sgMail
      .send(emailData)
      .then((sent) => {
        // console.log('SIGNUP EMAIL SENT', sent);
        return res.json({
          message: `Email has been sent to ${workEmail}. Follow the instruction to activate your account`
        });
      })
      .catch((err) => {
        // console.log('SIGNUP EMAIL SENT ERROR', err);
        return res.json({
          message: err.message
        });
      });
  });
};

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (
      err,
      decoded
    ) {
      if (err) {
        // console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
        return res.status(401).json({
          error: 'Link already expired, Signup again'
        });
      }
      const {
        employeeId,
        workEmail,
        firstName,
        lastName,
        password,
        workPhone,
        workAddress,
        personalEmail,
        personalPhone,
        personalAddress,
        company,
        section,
        jobTitle,
        authLevel,
        superiorEmployeeId,
        dob
      } = jwt.decode(token);
      const user = new User({
        employeeId,
        workEmail,
        firstName,
        lastName,
        password,
        workPhone,
        workAddress,
        personalEmail,
        personalPhone,
        personalAddress,
        company,
        section,
        jobTitle,
        authLevel,
        superiorEmployeeId,
        dob
      });
      user.save((err, user) => {
        if (err) {
          console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
          return res.status(401).json({
            error: 'Error saving user in db. Try Signup again'
          });
        }
        return res.json({
          message: 'Signup success. Please signin.'
        });
      });
    });
  } else {
    return res.json({
      message: 'Something went wrong. Try again.'
    });
  }
};

exports.signin = (req, res) => {
  const { employeeId, password } = req.body;

  //check if user exist
  User.findOne({ employeeId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Employee ID does not exist. Please signup.'
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Employee Id or password do not match.'
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    const {
      _id,
      role,
      employeeId,
      workEmail,
      firstName,
      lastName,
      workPhone,
      workAddress,
      personalEmail,
      personalPhone,
      personalAddress,
      company,
      section,
      jobTitle,
      authLevel,
      superiorEmployeeId,
      dob
    } = user;

    return res.json({
      token,
      user: {
        _id,
        role,
        employeeId,
        workEmail,
        firstName,
        lastName,
        workPhone,
        workAddress,
        personalEmail,
        personalPhone,
        personalAddress,
        company,
        section,
        jobTitle,
        authLevel,
        superiorEmployeeId,
        dob
      }
    });
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

exports.adminMiddleware = (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin access only. Access denied'
      });
    }
    req.profile = user;
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const { workEmail } = req.body;

  User.findOne({ workEmail }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Email does not exist'
      });
    }

    const token = jwt.sign(
      { _id: user._id, workEmail: user.workEmail },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: '10m'
      }
    );

    const emailData = {
      from: process.env.EMAIL_TO,
      to: workEmail,
      subject: `Password Reset link`,
      html: `
                <h1>Please use the following link to reset your account</h1>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
    };
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        console.log('PASSWORD RESET ERROR ', err);
        return res.status(400).json({
          error: 'Database error on password reset'
        });
      } else {
        sgMail
          .send(emailData)
          .then((sent) => {
            // console.log('SIGNUP EMAIL SENT', sent);
            return res.json({
              message: `Email has been sent to ${workEmail}. Follow the instruction to reset your email`
            });
          })
          .catch((err) => {
            // console.log('SIGNUP EMAIL SENT ERROR', err);
            return res.json({
              message: err.message
            });
          });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (
      err,
      decoded
    ) {
      if (err) {
        return res.status(400).json({
          error: 'Expired Link. Try Again'
        });
      }
      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'Oopps Something went wrong. Try again later'
          });
        }
        const updatedFields = {
          password: newPassword,
          resetPasswordLink: ''
        };

        user = _.extend(user, updatedFields);
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: 'Error saving user password'
            });
          }
          res.json({
            message:
              'New Password saved. You can now login with your new password'
          });
        });
      });
    });
  }
};
