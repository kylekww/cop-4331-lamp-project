const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        userID: { type: String },
        dateCreated: { type: Date },
        email:{
            type: String,
            unique: true,
           // required: true
        },
        username: {
            type: String, 
          //  required: true,
            unique: true,
        },
        password: {
            type: String, 
          //  required: true
        },
        name : {
            type: String,
           // required: true,
        },
        emailVerifyToken: {
            type: String
        },
        verified: {
            type: Boolean,
            defaultValue: false
        },
        moderator: {
            type: Boolean, 
            required:false,
            default: false
        },
    },
    { timestamps: true }
);
const model = mongoose.model('user',schema);

module.exports = model;