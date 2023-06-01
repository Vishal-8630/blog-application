function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action);
}

function destroyUserSession(req, res) {
    req.session.uid = null;
    req.session.isAdmin = false;
    res.locals.isAuth = false;
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserSession:  destroyUserSession
}