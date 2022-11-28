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
            defaultValue: 0
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
        }
    },
    { timestamps: true },
    { minimize: false }
)
const model = mongoose.model('confession',schema);

module.exports = model;