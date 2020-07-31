const { validationResult } = require('express-validator');

// helper function to check if any error done by express-validator middleware and send back respond to client
exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  next();
};
