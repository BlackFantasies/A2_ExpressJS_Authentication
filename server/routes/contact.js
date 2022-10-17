let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//  Connect to Our Contacts Model
let Contact = require('../models/contact');

let contactController = require('../controllers/contact');

//  Function to Guard Responses
function requireAuth(req, res, next) 
{
    //  Check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Contacts List page - READ Operation */
router.get('/', contactController.displayContactsList);

/* GET Route for the Add page - CREATE Operation */
router.get('/add', requireAuth, contactController.displayAddPage);

/* POST Route for the Add page - CREATE Operation */
router.post('/add', requireAuth, contactController.processAddPage);

/* GET Route for the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* POST Route for the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* GET to perform Delete operation - DELETE Operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;