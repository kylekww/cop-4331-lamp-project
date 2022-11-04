const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
            maxLength: 420
        },
        commentIDDateTime: {
            type: Date,
        },
        upvoteList: {
            type: Array
        },
        downvoteList:{
            type: Array
        },
        deleted: {
            type: Number,
            required: true
        },
        confessionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "confession"
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }
)
const model = mongoose.model('comment',schema);

module.exports = model;