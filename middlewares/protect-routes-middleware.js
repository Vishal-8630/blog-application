function protectRoutes(req, res, next) {
    if(req.path.startsWith('/blog') && !res.locals.isAuth) {
        return res.status(401).render('shared/errors/401');
    }

    if(req.path.startsWith('/admin') && !res.locals.isAdmin) {
        return res.status(403).render('shared/errors/403');
    }

    next();
}

module.exports = protectRoutes;