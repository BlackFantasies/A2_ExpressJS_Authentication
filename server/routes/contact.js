let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//  Connect to Our Contacts Model
let Contact = require('../models/contact');

/* GET Route for the Contacts List page - READ Operation */
router.get('/', (req, res, next) => {
    Contact.find((err, contactsList) => {
        if(err){
            return console.error(err);
        }
        else{
            res.render('contacts/list', {title: 'Business Contacts', ContactsList: contactsList});
        }
    });
});

/* GET Route for the Add page - CREATE Operation */
router.get('/add', (req, res, next) => {
    res.render('contacts/add', {title: 'Add Business Contact'});
});

/* POST Route for the Add page - CREATE Operation */
router.post('/add', (req, res, next) => {
    let newContact = Contact({
        "name": req.body.name,
        "phoneNumber": req.body.phoneNumber,
        "email": req.body.email
    });

    Contact.create(newContact, (err, Contact) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            //  refresh the contacts list
            res.redirect('/contacts-list')
        }
    });
});

/* GET Route for the Edit page - UPDATE Operation */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //  show the edit view
            res.render('contacts/edit', {title: 'Edit Contact', contact: contactToEdit});
        }
    });
});

/* POST Route for the Edit page - UPDATE Operation */
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "phoneNumber": req.body.phoneNumber,
        "email": req.body.email
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //  Refresh the Contacts List
            res.redirect('/contacts-list');
        }
    });
});

/* GET to perform Delete operation - DELETE Operation */
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //  Refresh the Contacts List
            res.redirect('/contacts-list');
        }
    });
});


module.exports = router;