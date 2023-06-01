const User = require('../models/user-model');
const Blog = require('../models/blog-model');

async function showAllUser(req, res, next) {
    let allUser;

    try {
        allUser = await User.getAllUser();
    }catch(error) {
        return next(error);
    }

    res.render('admin/all-user', {allUser: allUser});
}

async function userAllBlogs(req, res, next) {
    const userId = req.params.id;

    let userBlogs;
    try {
        userBlogs = await Blog.findBlogByUser(userId);
    }catch(error) {
        return next(error);
    }

    res.render('admin/user-all-blogs', {userBlogs: userBlogs});
}

module.exports = {
    showAllUser: showAllUser,
    userAllBlogs: userAllBlogs
}