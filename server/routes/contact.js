let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//  Connect to Our Contacts Model
let Contact = require('../models/contact');

let contactController = require('../controllers/contact');

/* GET Route for the Contacts List page - READ Operation */
router.get('/', contactController.displayContactsList);

/* GET Route for the Add page - CREATE Operation */
router.get('/add', contactController.displayAddPage);

/* POST Route for the Add page - CREATE Operation */
router.post('/add', contactController.processAddPage);

/* GET Route for the Edit page - UPDATE Operation */
router.get('/edit/:id', contactController.displayEditPage);

/* POST Route for the Edit page - UPDATE Operation */
router.post('/edit/:id', contactController.processEditPage);

/* GET to perform Delete operation - DELETE Operation */
router.get('/delete/:id', contactController.performDelete);

module.exports = router;