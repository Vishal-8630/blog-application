const Blog = require('../models/blog-model');
const User = require('../models/user-model');
const checkBlogInputs = require('../util/check-blog-inputs');
const flashBlogToSession = require('../util/flash-blog-session');


function getBlog(req, res, next) {
    const blogSessionData = flashBlogToSession.getBlogSessionData(req);
    res.render('blogger/new-blog', { blogSessionData: blogSessionData });
}

async function postBlog(req, res, next) {
    let user;
    try {
        user = await User.getUserById(res.locals.uid);
    } catch (error) {
        return next(error);
    }

    const blog = new Blog(
        res.locals.uid,
        user.fullname,
        req.body.title,
        req.body.content
    );

    const isValidInputs = checkBlogInputs(blog.title, blog.content);
    if (!isValidInputs) {
        flashBlogToSession.flashBlogDataToSession(req, {
            hasError: true,
            errorMessage: 'Invalid inputs!',
            title: blog.title,
            content: blog.content
        }, function () {
            res.redirect('/blog/new');
        });
        return;
    }

    try {
        await blog.saveBlog(next);
    } catch (error) {
        return next(error);
    }

    res.redirect('/blog/your-blogs');
}

async function yourBlogs(req, res, next) {
    let blogs;
    try {
        blogs = await Blog.findBlogByUser(res.locals.uid, next);
    } catch (error) {
        return next(error);
    }

    res.render('blogger/user-all-blogs', { blogs: blogs });
}

async function getEditBlog(req, res, next) {
    const blogId = req.params.id;

    let blog;
    try {
        blog = await Blog.findBlogById(blogId, next);

        if(!blog) {
            return res.redirect('404');
        }
        
    } catch (error) {
        return next(error);
    }

    
    res.render('blogger/edit-blog', { blog: blog });
}

async function postEditBlog(req, res, next) {
    const blogId = req.params.id;
    let user;

    try {
        user = await User.getUserById(res.locals.uid);
    } catch (error) {
        return next(error);
    }

    const newBlogData = {
        userId: user._id.toString(),
        userName: user.fullname,
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
        blogId: blogId
    };

    const isValidInputs = checkBlogInputs(newBlogData.title, newBlogData.content);
    if (!isValidInputs) {
        res.redirect(`/blog/${blogId}/edit`);
        return;
    }

    const blog = new Blog(
        newBlogData.userId,
        newBlogData.userName,
        newBlogData.title,
        newBlogData.content,
        newBlogData.date,
        newBlogData.blogId
    );

    try {
        await blog.saveBlog(next);
    } catch (error) {
        return next(error);
    }
    
    res.redirect('/blog/your-blogs');
}

async function deleteBlog(req, res, next) {
    const blogId = req.params.id;

    try{
        await Blog.deleteBlog(blogId, next);
    } catch(error) {
        return next(error);
    }

    if(res.locals.isAdmin) {
        res.redirect('/all-blogs');
    } else {
        res.redirect('/blog/your-blogs');
    }
}

module.exports = {
    getBlog: getBlog,
    postBlog: postBlog,
    yourBlogs: yourBlogs,
    getEditBlog: getEditBlog,
    postEditBlog: postEditBlog,
    deleteBlog: deleteBlog
}