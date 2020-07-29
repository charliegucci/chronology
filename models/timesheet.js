const mongoose = require('mongoose');

const timesheet = new mongoose.Schema({
  startDate: {
    type: String,
    default: ''
  },
  employeeId: {
    type: String
  },
  monday: [
    {
      type: Object
    }
  ],
  tuesday: [
    {
      type: Object
    }
  ],
  wednesday: [
    {
      type: Object
    }
  ],
  thursday: [
    {
      type: Object
    }
  ],
  friday: [
    {
      type: Object
    }
  ],
  saturday: [
    {
      type: Object
    }
  ],
  sunday: [
    {
      type: Object
    }
  ]
});

module.exports = mongoose.model('Timesheet', timesheet);
