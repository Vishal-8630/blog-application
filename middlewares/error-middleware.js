function internalError(error, req, res, next) {
    res.status(500).render('shared/errors/500');
    console.log(error);
}

function incorrectURLError(req, res) {
    res.status(404).render('shared/errors/404');
    console.log(error);
}

module.exports = {
    internalError: internalError,
    incorrectURLError: incorrectURLError
};