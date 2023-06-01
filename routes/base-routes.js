const baseController = require('../controllers/base-controllers');

const express = require('express');

const router = express.Router();

router.get('/', baseController.welcome);

router.get('/all-blogs', baseController.getAllBlogs);

router.get('/:id/view', baseController.viewBlog);

// Exporting all the routes
module.exports = router;