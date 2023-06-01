const adminControllers = require('../controllers/admin-controllers');

const express = require('express');

const router = express.Router();

router.get('/all-user', adminControllers.showAllUser);

router.get('/user/:id/all-blogs', adminControllers.userAllBlogs);

// Exporting all the routes
module.exports = router;