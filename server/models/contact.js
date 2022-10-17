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