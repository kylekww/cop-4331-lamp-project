const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        confession: {
            type: String,
            required: true,
            maxLength: 420
        },
        deleted: {
            type: Number,
            default: 0
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
        ],
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

schema.index({_id: -1, netVotes: -1});

const model = mongoose.model('confession',schema);

module.exports = model;