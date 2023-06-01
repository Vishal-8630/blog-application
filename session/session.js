const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

function sessionStore() {
    const mongoDbStore = mongodbStore(session);
    
    const store = mongoDbStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'blog-project',
        session: 'sessions'
    });

    return store;
}

function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore(),
        cookie: {
            maxAge: 60 * 60 * 1000
        }
    };
}

module.exports = createSessionConfig;