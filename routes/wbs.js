const express = require('express');
const router = express.Router();

//importing controller for wbs routes
const { readWbs } = require('../controllers/wbs');

//routes
router.get('/wbs', readWbs);

module.exports = router;
