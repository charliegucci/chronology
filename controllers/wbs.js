const Wbs = require('../models/wbs');

exports.readWbs = (req, res) => {
  Wbs.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Cant Read WBS'
      });
    }
    res.json(data);
  });
};
