const express = require('express');
const router = express.Router();

// importing controller for timesheet
const { saveTimesheet, readTimesheet } = require('../controllers/timesheet');

//routes for timesheet
router.post('/timesheet', saveTimesheet);
router.get('/timesheet/read/:id', readTimesheet);

module.exports = router;
