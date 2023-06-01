function getSessionData(req) {
    let sessionData = req.session.sessionData;

    if(!sessionData) {
        sessionData = {
            hasError: false,
            email: '', 
            confirmEmail: '',
            password: '',
            fullname: '',
            address: {
                street: '',
                postal: '',
                city: ''
            }
        }
    }
    req.session.sessionData = null;
    return sessionData;
}

function flashDataToSession(req, data, action) {
    req.session.sessionData = data;
    req.session.save(action);
}

module.exports = {
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession
}