let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//  Create a Reference to the Model
let Contact = require('../models/contact');

module.exports.displayContactsList = (req, res, next) => {
    Contact.find((err, contactsList) => {
        if(err){
            return console.error(err);
        }
        else{       
            res.render('contacts/list', {title: 'Business Contacts', ContactsList: contactsList});
        }
    }).sort({name: 'asc'});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contacts/add', {title: 'Add Business Contact'});
}

module.exports.processAddPage = (req, res, next) => {
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
}

module.exports.displayEditPage = (req, res, next) => {
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
}

module.exports.processEditPage = (req, res, next) => {
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
}

module.exports.performDelete = (req, res, next) => {
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
}