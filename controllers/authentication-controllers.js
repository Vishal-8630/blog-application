const authValidation = require('../util/auth-validation');
const flashToSession = require('../util/flash-session');
const userSession = require('../util/create-session');
const User = require('../models/user-model');

// Rendering signup page
function getSignup(req, res) {
    const sessionData = flashToSession.getSessionData(req);
    res.render('authentication/signup', {sessionData: sessionData});
}

// Rendering login page
function getLogin(req, res) {
    const sessionData = flashToSession.getSessionData(req);
    res.render('authentication/login', {sessionData: sessionData});
}

// Taking user data
async function postSignup(req, res, next) {

    const user = new User(
        req.body.email,
        req.body['confirm-email'],
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    );

    const isValidInputs = authValidation.checkInputs(user);
    if(!isValidInputs) {
        flashToSession.flashDataToSession(req, {
            hasError: true,
            errorMessage: `Invalid inputs!`,
            ...user
        }, function() {
            res.redirect('/signup');
        });

        return;
    }

    const isValidEmail = authValidation.checkEmails(user.email, user.confirmEmail);
    if(!isValidEmail) {
        flashToSession.flashDataToSession(req, {
            hasError: true,
            errorMessage: `Invalid emails!`,
            ...user
        }, function() {
            res.redirect('/signup');
        });

        return;
    }

    try {
        const isUserAlreadyExist = await user.isUserAlreadyExist();

        if(isUserAlreadyExist) {
            flashToSession.flashDataToSession(req, {
                hasError: true,
                errorMessage: `User already exist! - login to account`,
                ...user
            }, function() {
                res.redirect('/signup');
            });

            return;
        }

        await user.saveUser();
    } catch(error) {
        next(error);
        return;
    }

    res.redirect('/login');
}

async function postLogin(req, res, next) {
    const user = new User(req.body.email, null, req.body.password);

    let existingUser;

    try {
        existingUser = await user.getUserByEmail();
    }catch(error) {
        return next(error);
    }

    if(!existingUser) {
        flashToSession.flashDataToSession(req, {
            hasError: true,
            errorMessage: `User doesn't exist! - Create account`,
            ...user
        }, function() {
            res.redirect('/login');
        });

        return;
    }

    const isCorrectPassword = await user.compareUserPassword(existingUser.password);
    if(!isCorrectPassword) {
        flashToSession.flashDataToSession(req, {
            hasError: true,
            errorMessage: `Incorrect password!`,
            ...user
        }, function() {
            res.redirect('/login');
        });

        return;
    }

    userSession.createUserSession(req, existingUser, function() {
        res.redirect('/');
    });
}

async function logout(req, res) {
    userSession.destroyUserSession(req, res);
    res.redirect('/');
}

// Exporting all the functionallity
module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    postSignup: postSignup,
    postLogin: postLogin,
    logout: logout
}