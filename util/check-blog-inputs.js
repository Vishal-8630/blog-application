function checkBlogInputs(title, content) {
    if(title.trim() === '' || content.trim() === '') {
        return false;
    }

    return true;
}

module.exports = checkBlogInputs;