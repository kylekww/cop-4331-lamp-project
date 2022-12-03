const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
            maxLength: 420
        },
        deleted: {
            type: Number,
            default: 0
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
        },
        netVotes:{
            type: Number,
            default: 0
        }
    },
    { timestamps: true },
    { minimize: false }
)
schema.index({netVotes:1, _id: 1});
const model = mongoose.model('comment',schema);

module.exports = model;