const express = require('express');
const router = express.Router();

//controller
const { readWbs } = require('../controllers/wbs');

//routes
router.get('/wbs', readWbs);

module.exports = router;
