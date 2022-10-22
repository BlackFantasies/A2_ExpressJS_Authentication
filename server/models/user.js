/* File Name: user.js   Student Name: James Yan   Student ID: 301229536   Date: 10/21/2022 */
//  Require Moduels for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        /* 
        password:
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        },
        */
        
        email: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'email address is required'
        },

        displayName: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
        }
    },
    {
        collection: "users"
    }
);

//  Configure Options for User Model
let options = ({missingPasswordError: 'Wrong/Missing Password'});

User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);