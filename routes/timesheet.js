const express = require('express');
const router = express.Router();

//controller
const { saveTimesheet, readTimesheet } = require('../controllers/timesheet');

//routes
router.post('/timesheet', saveTimesheet);
router.get('/timesheet/read/:id', readTimesheet);

module.exports = router;
