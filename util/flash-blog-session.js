function getBlogSessionData(req) {
    let blogSessionData = req.session.blogSessionData;

    if(!blogSessionData) {
        blogSessionData = {
            hasError: false,
            errorMessage: '',
            title: '',
            content: ''
        }
    }

    req.session.blogSessionData = null;
    return blogSessionData;
}

function flashBlogDataToSession(req, data, action) {
    req.session.blogSessionData = data;
    req.session.save(action);
}

module.exports = {
    getBlogSessionData: getBlogSessionData,
    flashBlogDataToSession: flashBlogDataToSession
}