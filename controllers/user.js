const User = require('../models/user');

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.update = (req, res) => {
  const {
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
    superiorEmployeeId,
    dob
  } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    if (!firstName) {
      return res.status(400).json({
        error: 'First Name is Required'
      });
    } else {
      user.firstName = firstName;
    }
    if (!lastName) {
      return res.status(400).json({
        error: 'Last Name is Required'
      });
    } else {
      user.lastName = lastName;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password should be min 6 characters'
        });
      } else {
        user.password = password;
      }
    }
    if (!workPhone) {
      return res.status(400).json({
        error: 'Work Phone is Required'
      });
    } else {
      user.workPhone = workPhone;
    }
    if (!workAddress) {
      return res.status(400).json({
        error: 'Work Address is Required'
      });
    } else {
      user.workAddress = workAddress;
    }
    if (!personalEmail) {
      return res.status(400).json({
        error: 'Personal Email is Required'
      });
    } else {
      user.personalEmail = personalEmail;
    }

    if (!personalPhone) {
      return res.status(400).json({
        error: 'Personal Phone is Required'
      });
    } else {
      user.personalPhone = personalPhone;
    }
    if (!personalAddress) {
      return res.status(400).json({
        error: 'Personal Address is Required'
      });
    } else {
      user.personalAddress = personalAddress;
    }

    if (!company) {
      return res.status(400).json({
        error: 'Company is Required'
      });
    } else {
      user.company = company;
    }
    if (!section) {
      return res.status(400).json({
        error: 'Section is Required'
      });
    } else {
      user.section = section;
    }

    if (!jobTitle) {
      return res.status(400).json({
        error: 'Job Title is Required'
      });
    } else {
      user.jobTitle = jobTitle;
    }
    if (!superiorEmployeeId) {
      return res.status(400).json({
        error: 'Superior Employee ID is Required'
      });
    } else {
      user.superiorEmployeeId = superiorEmployeeId;
    }
    if (!dob) {
      return res.status(400).json({
        error: 'Date of Birth is Required'
      });
    } else {
      user.dob = dob;
    }
    user.save((err, updatedUser) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: 'User update failed'
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};
