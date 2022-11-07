const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        comment: {
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
        deleted: {
            type: Number,
            defaultValue: 0
        },
        confessionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "confession"
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        voteID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "votes",
        }
    },
    { timestamps: true },
    { minimize: false }
)
const model = mongoose.model('comment',schema);

module.exports = model;