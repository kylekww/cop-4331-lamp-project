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
    voteObj.save();
    const confession = await Confession.create({...req.body, userID: ID, voteID: voteObj});

    return res.status(201)
    .json({
        message: "confession posted", 
        confession: confession.toObject()
    });
}

// delete confession 
exports.deleteConfession = async (req, res) => {
    confession = await Confession.findById(req.body.id);
    

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
    let confession = await Confession.findById(req.body.id);
    let votes = await Votes.findById({_id: confession.voteID})


    if(confession.deleted === 1 || confession.deleted === -1){

        return res.status(404).json({message: "post not found"});
    }

    let voterID = await User.findById(req.session.userId);
    //inList=0 if user is not in ny list
    //inList=1 if user has upvoted
    //inList=-1 if user has downvoted
    let inList = 0;
    for (var i = 0; i < votes.downvoteList.length; i++) {
        if(votes.downvoteList[i]._id==req.session.userId){
            inList=-1;
            break;
        }
    }
    for (var i = 0; i < votes.upvoteList.length; i++) {
        if(votes.upvoteList[i]._id==req.session.userId){
            inList=1;
            break;
        }
    }

    // we want to upvote
    if(req.body.vote === 1){
        //Votes.find({ downvoteList: voterID });
        if(inList==-1){
            votes.downvoteList.pull(voterID);
            votes.upvoteList.push(voterID);
            votes.netVotes=votes.netVotes+2;
            await votes.save();
            return res.status(201).json({
                message: "vote changed from downvote to upvote",
                "upvoteList": votes.upvoteList,
                "downvoteList": votes.downvoteList,
                "netVotes": votes.netVotes
            });
        }
        ////Votes.find({ upvoteList: voterID });
        else if(inList==1){
            votes.upvoteList.pull(voterID);
            votes.netVotes--;
            await votes.save();

            return res.status(201).json({
                message: "vote changed from upvote to none",
                "upvoteList": votes.upvoteList,
                "downvoteList": votes.downvoteList,
                "netVotes": votes.netVotes
            });
        }
        else{
            votes.upvoteList.push(voterID);
            votes.netVotes++;
            await votes.save();
            return res.status(201).json({
                message: "vote added as upvote",
                "upvoteList": votes.upvoteList,
                "downvoteList": votes.downvoteList,
                "netVotes": votes.netVotes
            });
        }
    }
    else if(req.body.vote === -1){ // we want to downvote post
        if(inList==1){
            votes.upvoteList.pull(voterID);
            votes.downvoteList.push(voterID);
            votes.netVotes = votes.netVotes - 2; 
            await votes.save();

            return res.status(201).json({
                message: "vote changed from upvote to downvote",
                "upvoteList": votes.upvoteList,
                "downvoteList": votes.downvoteList,
                "netVotes": votes.netVotes
            });
        }
        else if(inList==-1){
            votes.downvoteList.pull(voterID);
            votes.netVotes++;
            await votes.save();

            return res.status(201).json({
                message: "vote changed from downvote to none",
                "upvoteList": votes.upvoteList,
                "downvoteList": votes.downvoteList,
                "netVotes": votes.netVotes
            });
        }
        else{
            votes.downvoteList.push(voterID);
            votes.netVotes--;
            await votes.save();

            return res.status(201).json({
                message: "vote added as downvote",
                "upvoteList": votes.upvoteList,
                "downvoteList": votes.downvoteList,
                "netVotes": votes.netVotes
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

