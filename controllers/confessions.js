const Confession = require('../models/confession');
const Votes = require('../models/votes');
const User = require('../models/user');
const _ = require('lodash');
const addConfessionValidator = require('../validators/addConfession');
const { findOne, findById } = require('../models/user');


//add confession
exports.addConfession = async (req, res) => {
    const validationResult = addConfessionValidator(req.body);
    let ID = await User.findById(req.session.userId);
    if(validationResult !== true){
        return res.status(400).json({message: validationResult});
    }
    const voteObj = new Votes();
    const confession = await Confession.create({...req.body, userID: ID, votes: voteObj});

    return res.status(201)
    .json({
        message: "confession posted", 
        confession: confession.toObject()
    });
}

// delete confession 
exports.deleteConfession = async (req, res) => {
    confession = await Confession.findById(req.body.confessionID);
    // Confession.findById(req.body.confessionID); if we want the confessionID in the body of the request instead (change route to remove /:id)

    user = await User.findById(req.session.userId);
    if(user.moderator){
        confession.deleted = -1;
        return res.status(201).json({message: "This post was deleted by a moderator"});
    }
    else if(!user.moderator){
        confession.deleted = 1;
        return res.status(201).json({message: "This post was deleted successfully"});
    }
}

//search confession
exports.searchConfession = async (req, res) => {
    // Input: usrID and search criteria
    let ID = await User.findById(req.session.userId);
    let resultsPerPage = 15;
    let searchVar = req.body.searchVal;
    //if searchVar==1, sort by most recent 
    if(searchVar==1){
        searchResults = await Confession.find(
            {
                "userID": ID
            }).
            limit(resultsPerPage).sort({timestamps: -1});
    }
    //if searchVar==2, sort by most popular
    if(searchVar==2){
        searchResults = await Confession.find(
            {
                "userID": ID
            }).
            limit(resultsPerPage).sort({timestamps: -1,netVotes:1});
    }
    res.status(201).json(searchResults);
}

//change vote
exports.changeVote = async (req, res) => {
    confession = await Confession.findById(req.body.id);

    if(confession.deleted === 1 || confession.deleted === -1){

        return res.status(404).json({message: "post not found"});
    }

    let voterID = await User.findById(req.session.userId);
    // we want to upvote
    if(req.body.vote === 1){
        if(confession.votes.downvoteList.includes(voterID)){
            confession.votes.downvoteList.pull(voterID);
            confession.votes.upvoteList.push(voterID);
            confession.votes.netVotes=confession.votes.netVotes+2;
            await confession.save();
            return res.status(201).json({
                message: "vote changed from downvote to upvote",
                "upvoteList": confession.vote.upvoteList,
                "downvoteList": confession.vote.downvoteList
            });
        }
        else if(confession.votes.upvoteList.includes(voterID)){
            confession.votes.upvoteList.pull(voterID);
            confession.votes.netVotes--;
            await confession.save();

            return res.status(201).json({
                message: "vote changed from upvote to none",
                "upvoteList": confession.vote.upvoteList,
                "downvoteList": confession.vote.downvoteList
            });
        }
        else{
            confession.votes.upvoteList.push(voterID);
            confession.votes.netVotes++;
            await confession.save();
            return res.status(201).json({
                message: "vote added as upvote",
                "upvoteList": confession.votes.upvoteList,
                "downvoteList": confession.votes.downvoteList
            });
        }
    }
    else if(req.body.vote === -1){ // we want to downvote post
        if(confession.votes.upvoteList.includes(voterID)){
            confession.votes.upvoteList.pull(voterID);
            confession.votes.downvoteList.push(voterID);
            confession.votes.netVotes = confession.votes.netVotes - 2; 
            await confession.save();

            return res.status(201).json({
                message: "vote changed from upvote to downvote",
                "upvoteList": confession.votes.upvoteList,
                "downvoteList": confession.votes.downvoteList
            });
        }
        else if(confession.votes.downvoteList.includes(voterID)){
            confession.votes.downvoteList.pull(voterID);
            confession.votes.netVotes++;
            await confession.save();

            return res.status(201).json({
                message: "vote changed from downvote to none",
                "upvoteList": confession.votes.upvoteList,
                "downvoteList": confession.votes.downvoteList
            });
        }
        else{
            confession.votes.downvoteList.push(voterID);
            confession.votes.netVotes--;
            await confession.save();

            return res.status(201).json({
                message: "vote added as downvote",
                "upvoteList": confession.votes.upvoteList,
                "downvoteList": confession.votes.downvoteList
            });
        }
    }
}

//confession information
exports.information = async (req, res) => {
    // returns all of the information about the confession. 
    confession = await Confession.findById(req.body.id);
    return res.json({confession: confession.toObject()});
}

