const mongoose = require('mongoose');
const crypto = require('crypto');

// User Schema
const userSchema = new mongoose.Schema(
  {
    employee_id: {
      type: String,
      trim: true,
      required: true
    },
    first_name: {
      type: String,
      trim: true,
      required: true
    },
    last_name: {
      type: String,
      trim: true,
      required: true
    },
    work_email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    work_phone: {
      type: Number,
      trim: true,
      required: true
    },
    work_address: {
      type: String,
      trim: true,
      required: true
    },
    personal_email: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    personal_phone: {
      type: Number,
      trim: true,
      required: true
    },
    personal_address: {
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
    job_title: {
      type: String,
      trim: true,
      required: true
    },
    auth_level: {
      type: String,
      trim: true,
      required: true
    },
    superior_employee_id: {
      type: String,
      trim: true,
      required: true
    },
    dob: {
      type: String,
      trim: true,
      required: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
      default: 'subscriber'
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
