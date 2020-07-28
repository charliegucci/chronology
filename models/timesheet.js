const mongoose = require('mongoose');

const timesheet = new mongoose.Schema({
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
  // monday: [
  //   {
  //     level1_code: {
  //       type: String
  //     },
  //     level1_title: {
  //       type: String
  //     },
  //     level2_code: {
  //       type: String
  //     },
  //     level2_title: {
  //       type: String
  //     },
  //     level3_code: {
  //       type: String
  //     },
  //     level3_title: {
  //       type: String
  //     },
  //     level4_code: {
  //       type: String
  //     },
  //     level4_title: {
  //       type: String
  //     },
  //     wbs: {
  //       type: String
  //     },
  //     wbs_title: {
  //       type: String
  //     },
  //     employee_id: {
  //       type: String
  //     },
  //     hours: {
  //       type: String
  //     },
  //     hours_modifier: {
  //       type: String
  //     },
  //     pay_type: {
  //       type: String
  //     },
  //     auth1: {
  //       type: String
  //     },
  //     auth1_employee_id: {
  //       type: String
  //     },
  //     auth1_timestamp: {
  //       type: String
  //     },
  //     auth2: {
  //       type: String
  //     },
  //     auth2_employee_id: {
  //       type: String
  //     },
  //     auth2_timestamp: {
  //       type: String
  //     },
  //     auth3: {
  //       type: String
  //     },
  //     auth3_employee_id: {
  //       type: String
  //     },
  //     auth3_timestamp: {
  //       type: String
  //     },
  //     rejection_employee_id: {
  //       type: String
  //     },
  //     rejection_auth: {
  //       type: String
  //     },
  //     rejection_timestamp: {
  //       type: String
  //     },
  //     rejection_comments: {
  //       type: String
  //     }
  //   },
  //   { timestamps: true }
  // ]
});

module.exports = mongoose.model('Timesheet', timesheet);
