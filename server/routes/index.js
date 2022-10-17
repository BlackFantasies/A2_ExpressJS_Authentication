/* File Name: index.js   Student Name: James Yan   Student ID: 301229536   Date: 09/30/2022 */
var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET Home page. */
router.get('/', indexController.displayHomePage);

/* GET Home page redirect. */
router.get('/home', indexController.displayHomePage);

/* GET About Me page. */
router.get('/about', indexController.displayAboutMePage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);

/* GET Route for Displaying Login Page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for Processing the Login Page */
router.post('/login', indexController.processLoginPage);

module.exports = router;

