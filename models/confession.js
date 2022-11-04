const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        confession: {
            type: String,
            required: true,
            maxLength: 420
        },
        upvoteList: {
            type: Array
        },
        downvoteList:{
            type: Array
        },
        netVotes:{
            type: Number,
            defaultValue: 0
        },
        userInteracted: [{
            "userID": String,
            "interacted": Number
        }],
        deleted: {
            type: Number,
            defaultValue: 0
           // required: true
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }
        ]
    },
    { timestamps: true }
)
const model = mongoose.model('confession',schema);

module.exports = model;