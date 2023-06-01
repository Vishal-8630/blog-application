const express = require('express');

// Imporing authentication controllers
const authRoutes = require('../controllers/authentication-controllers');

const router = express.Router();

// Rendering signup page
router.get('/signup', authRoutes.getSignup);

// Rendering login page
router.get('/login', authRoutes.getLogin);

// Taking user data 
router.post('/signup', authRoutes.postSignup);

// 
router.post('/login', authRoutes.postLogin);

// Logout functionallity
router.get('/logout', authRoutes.logout);

// Exporting all the routes
module.exports = router;