let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//  Connect to Our Book Model
let Contact = require('../models/contact');

/* GET Route for the Book List page - READ Operation */
router.get('/', (req, res, next) => {
    Contact.find((err, contactsList) => {
        if(err){
            return console.error(err);
        }
        else{
            res.render('contacts', {title: 'Business Contacts List', ContactsList: contactsList})
        }
    });
});

module.exports = router;