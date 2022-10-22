/* File Name: contact.js   Student Name: James Yan   Student ID: 301229536   Date: 10/21/2022 */
let mongoose = require('mongoose');

//  Create a Model Class
let contactsModel = mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactsModel);