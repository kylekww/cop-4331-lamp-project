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
        color: {
            type: String,
            required: true,
            default: "#ff0000"
        }
    },
    { timestamps: true }
);
const model = mongoose.model('user',schema);

module.exports = model;