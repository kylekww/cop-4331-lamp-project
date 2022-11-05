const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        upvoteList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }],
        downvoteList:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }],
        netVotes:{
            type: Number,
            default: 0
        }
        
    },
    { minimize: false }
);

const votes = mongoose.model('votes',schema);

module.exports = votes;