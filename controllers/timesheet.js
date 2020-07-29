const Timesheet = require('../models/timesheet');

exports.saveTimesheet = (req, res) => {
  Timesheet.findOne({ employeeId: req.body.employeeId }).then((item) => {
    if (item) {
      Timesheet.findByIdAndUpdate(item._id, req.body, { new: true }).then(
        (response) => {
          res.send(response);
        }
      );
    } else {
      const timesheet = new Timesheet(req.body);

      timesheet.save((err, log) => {
        if (err) {
          return res.status(400).json({
            error: 'Error Saving Logs'
          });
        }
        res.json({
          log
        });
      });
    }
  });
};

exports.readTimesheet = (req, res) => {
  const id = req.params.id;

  Timesheet.findOne({ employeeId: id }).then((user) => {
    if (user) {
      res.json(user);
    } else {
      const timesheet = new Timesheet({ employeeId: id });
      timesheet.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Error Loading Timesheet'
          });
        } else {
          res.json(data);
        }
      });
    }
  });
};