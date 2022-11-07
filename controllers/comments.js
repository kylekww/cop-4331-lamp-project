const Comment = require('../models/comments');
const Confession = require('../models/confession');
const Votes = require('../models/votes');
const User = require('../models/user');
const _ = require('lodash');
const addCommentValidator = require('../validators/addComment');

exports.addComment = async (req, res) =>{
    const validationResult = addCommentValidator(req.body);
    let user = await User.findById(req.session.userId);
    let confession = await Confession.findById(req.body.confessionID);

    if(!validationResult)
        return res.status(400).json({message: validationResult});

    const initVotes = new Votes();
    initVotes.save();
    const comment = await Comment.create({...req.body, userID: user, 
            confessionID: confession, voteID: initVotes});
    // add comment to confessions
    confession.comments.push(comment.id);

    return res.status(200).json({message: "comment added successfully", comment: comment.toObject()});
}

exports.deleteComment = async (req, res) => {
    comment = await Comment.findById(req.body.id);

    user = await User.findById(req.session.userId);

    if(comment.deleted === -1 || comment.deleted === 1)
        return res.json({message: "this comment has already been deleted"});

    if(user.moderator){
        comment.deleted = -1;
        return res.status(200).json({message: "comment removed by moderator", deleted: comment.deleted});
    }
    else{
        comment.deleted = 1;
        return res.status(200).json({message: "comment removed", deleted: comment.deleted});
    }
}

exports.searchComments = async (req, res) => {
    let resultsPerPage = 15;
    let searchVar = req.body.searchVal;
    let query = req.body.query;
    //if searchVar==1, sort by most recent 
    if(searchVar==1){
        searchResults = await Comment.find(
            {"comment": {$regex: '.*' + query + '.*', $options: 'i'}}).
            limit(resultsPerPage).sort({timestamps: -1}).lean();
    }
    //if searchVar==2, sort by most popular
    if(searchVar==2){
        searchResults = await Comment.find(
            {"comment": {$regex: '.*' + query + '.*', $options: 'i'}}).
            limit(resultsPerPage).sort({timestamps: -1,netVotes:1}).lean();
    }
   
    for(var i = 0; i < searchResults.length; i++){
        searchResults[i]["userInteracted"] = 0;
    }

    for (var i = 0; i < searchResults.length; i++) {
        let votes = await Votes.findById({_id: searchResults[i].voteID});
        //check if user has downvoted
        for(var j = 0; j < votes.downvoteList.length; j++){
            if(votes.downvoteList[j]==req.session.userId){
                searchResults[i].userInteracted = -1;
                
            }
        }
        //check if user has upvoted
        for(var j = 0; j < votes.upvoteList.length; j++){
            console.log(req.session.userId);
            if(votes.upvoteList[j]==req.session.userId){
                searchResults[i].userInteracted = 1;
                
            }
        }

    }
    res.status(201).json(searchResults);
}