const Timesheet = require('../models/timesheet');

exports.saveTimesheet = (req, res) => {
  Timesheet.findOne({
    employeeId: req.body.employeeId,
    startDate: req.body.startDate
  }).then((item) => {
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
          console.log(err);
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

  Timesheet.findOne({ employeeId: id })
    .then((data, err) => {
      if (data) {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      if (err) {
        console.log('Error Reading Timesheet', err);
      }
    });
};
