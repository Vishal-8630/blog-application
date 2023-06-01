const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

// Route Section
const authenticationRoutes = require('./routes/authentication-routes');
const baseRoutes = require('./routes/base-routes');
const blogRoutes = require('./routes/blog-routes');
const adminRoutes = require('./routes/admin-routes');

// Middlewares Section
const addCsrfMiddleware = require('./middlewares/csrf-middleware');
const checkAuthMiddleware = require('./middlewares/check-auth-middleware');
const errorMiddleware = require('./middlewares/error-middleware');
const protectRoutesMiddleware = require('./middlewares/protect-routes-middleware');

// Session Configuration 
const createSessionConfig = require('./session/session');

// Requiring Database
const db = require('./data/database');

const app = express();

// EJS engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static('public'));

// Text encoder
app.use(express.urlencoded({extended: false}));

// Session Configuration
const sessionConfig = createSessionConfig();
app.use(session(sessionConfig));

// CSRF Section
app.use(csrf());
app.use(addCsrfMiddleware);

// Checking login status and setting local variables
app.use(checkAuthMiddleware);

// Routes Section
app.use(baseRoutes);
app.use(authenticationRoutes);
app.use(protectRoutesMiddleware);
app.use('/blog', blogRoutes);
app.use('/admin', adminRoutes);

// Error handling
app.use(errorMiddleware.incorrectURLError);
app.use(errorMiddleware.internalError);

db.connectToDatabase().then(function(){
    app.listen(3000);
}).catch(function() {
    console.log('Database connection failed!');
    console.log(error);
});
