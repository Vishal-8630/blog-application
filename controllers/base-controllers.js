const Blog = require('../models/blog-model');

function welcome(req, res) {
    res.redirect('/all-blogs');
}

function error401(req, res) {
    res.render('shared/errors/401');
}

function error403(req, res) {
    res.render('shared/errors/403');
}

async function getAllBlogs(req, res, next) {
    let blogs;

    try {
        blogs = await Blog.findAllBlogs();
    } catch(error) {
        return next(error);
    }
    
    res.render('shared/all-blogs', {blogs: blogs});
}


async function viewBlog(req, res, next) {
    const blogId = req.params.id;

    let blog;
    try {
        blog = await Blog.findBlogById(blogId, next);
    }catch(error) {
        return next(error);
    }

    if(!blog) {
        return res.redirect('404');
    } else {
        res.render('shared/view-blog', {blog: blog});
    }
}

module.exports = {
    welcome: welcome,
    error401: error401,
    error403: error403,
    getAllBlogs: getAllBlogs,
    viewBlog: viewBlog
}