const Timesheet = require('../models/timesheet');

exports.saveTimesheet = (req, res) => {
  // check if employeeId already exists in timesheets
  Timesheet.findOne({ employeeId: req.body.employeeId }).then((item) => {
    console.log(item);
    // res.send('hi');
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
  // if it exists update existing

  // if doesnt exist
};

exports.readTimesheet = (req, res) => {
  const id = req.params.id;

  Timesheet.findOne({ employeeId: id }).exec((err, data) => {
    if (err) {
      res.json({
        error: 'Error Loading Timesheet'
      });
    }
    res.json(data);
  });
};
