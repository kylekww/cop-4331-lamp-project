const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        email:{
            type: String,
            unique: true,
            required: true
        },
        username: {
            type: String, 
            required: true,
            unique: true,
        },
        password: {
            type: String, 
            required: true
        },
        name : {
            type: String,
            required: true,
        },
        emailVerifyToken: {
            type: String
        },
        verified: {
            type: Boolean,
            default: false
        },
        moderator: {
            type: Boolean, 
            required:false,
            default: false
        },
        deleted: {
            type: Boolean, 
            defualt: false
        },
    },
    { timestamps: true }
);

schema.index( { 'username' : 1 },
    { 'collation' : { 'locale' : 'en_US' , 'strength': 2} });

const model = mongoose.model('user',schema);

module.exports = model;