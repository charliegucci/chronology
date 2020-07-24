const mongoose = require('mongoose');
const crypto = require('crypto');

// User Schema
const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      trim: true,
      required: true
    },
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    workEmail: {
      type: String,
      trim: true,
      required: true,
      lowercase: true
    },
    workPhone: {
      type: Number,
      trim: true,
      required: true
    },
    workAddress: {
      type: String,
      trim: true,
      required: true
    },
    personalEmail: {
      type: String,
      trim: true,
      required: true
    },
    personalPhone: {
      type: Number,
      trim: true,
      required: true
    },
    personalAddress: {
      type: String,
      trim: true,
      required: true
    },
    company: {
      type: String,
      trim: true,
      required: true
    },
    section: {
      type: String,
      trim: true,
      required: true
    },
    jobTitle: {
      type: String,
      trim: true,
      required: true
    },
    authLevel: {
      type: String,
      trim: true,
      required: true
    },
    superiorEmployeeId: {
      type: String,
      trim: true,
      required: true
    },
    dob: {
      type: String,
      trim: true,
      required: true
    },
    img: {
      data: Buffer,
      contentType: String
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
      default: 'Level1'
    },
    resetPasswordLink: {
      data: String,
      default: ''
    }
  },
  { timestamps: true }
);

// virtual field
userSchema
  .virtual('password')
  .set(function (password) {
    // create a temporary variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encryptPassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

module.exports = mongoose.model('User', userSchema);
