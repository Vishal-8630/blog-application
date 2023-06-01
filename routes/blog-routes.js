const express = require('express');

const blogControllers = require('../controllers/blog-controllers');

const router = express.Router();

router.get('/new', blogControllers.getBlog);

router.post('/post-blog', blogControllers.postBlog);

router.get('/your-blogs', blogControllers.yourBlogs);

router.get('/:id/edit', blogControllers.getEditBlog);

router.post('/:id/edit', blogControllers.postEditBlog);

router.post('/:id/delete', blogControllers.deleteBlog);

// Exporting all the routes
module.exports = router;