let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//  Create the User Model Instance
let userModel = require('../models/user');
let User = userModel.User   //  Alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});
}

module.exports.displayAboutMePage = (req, res, next) => {
    res.render('about', { title: 'About Me', firstName: 'James',  lastName: 'Yan' });
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', {title: 'Projects'});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', {title: 'Services'});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', {title: 'Contact'});
}

module.exports.displayLoginPage = (req, res, next) => {
    //  Check if the user is already loggied in
    if(!req.user){
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displaName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', 
    (err, user, info) => {
        //  server error?
        if(err)
        {
            return next(err);
        }
        //  Is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error Maybe');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //  Server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/about')
        })
    })(req, res, next);
}
