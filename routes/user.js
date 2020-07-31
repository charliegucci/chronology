const express = require('express');
const router = express.Router();

// import controller for user
const { requireSignin, level2Middleware } = require('../controllers/auth');
const { read, update } = require('../controllers/user');

// routes for user
router.get('/user/:id', requireSignin, read);
router.put('/user/update', requireSignin, update);
router.put('/level2/update', requireSignin, level2Middleware, update);

module.exports = router;
