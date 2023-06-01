function checkEmails(email, confirmEmail) {
    if (email === confirmEmail) {
        return true;
    }

    return false;
}

function checkInputs(user) {
    if (
        user.password.trim() === '' ||
        user.fullname.trim() === '' ||
        user.address.street.trim() === '' ||
        user.address.postal.trim() === '' ||
        user.address.city.trim() === ''
    ) {
        return false;
    }

    return true;
}

module.exports = {
    checkEmails: checkEmails,
    checkInputs: checkInputs
}