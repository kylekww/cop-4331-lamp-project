const Comment = require('../models/comments');
const Confession = require('../models/confession');
const Votes = require('../models/votes');
const User = require('../models/user');
const _ = require('lodash');
const addCommentValidator = require('../validators/addComment');
const mongoose = require('mongoose')

exports.addComment = async (req, res) =>{
    const validationResult = addCommentValidator(req.body);
    let user = await User.findById(req.session.userId);
    let confession = await Confession.findById(req.body.confessionID);

    if(!validationResult)
        return res.status(400).json({message: validationResult});

    const initVotes = new Votes();
    initVotes.save();
    const comment = await Comment.create({...req.body, userID: user, 
            confessionID: confession._id, voteID: initVotes});
    // add comment to confessions
    confession.comments.push(comment);
    confession.save();

    return res.status(200).json({message: "comment added successfully", comment: comment.toObject()});
}

exports.deleteComment = async (req, res) => {
    comment = await Comment.findById(req.body.id);

    if(comment == null){
        return res.status(404).json({message: "Comment not found"});
    }
    user = await User.findById(req.session.userId);
    if(user == null){
        return res.status(404).json({message: "User not found"});
    }

    if(comment.deleted === -1 || comment.deleted === 1)
        return res.json({message: "this comment has already been deleted"});

    if(user.moderator){
        comment.deleted = -1;
        comment.save();
        await Confession.findOneAndUpdate( 
            {_id: comment.confessionID}, 
            { $pull: {comments: comment._id}},
            {new:true});
        
            
        return res.status(200).json({message: "comment removed by moderator", deleted: comment.deleted});
    }
    else{
        comment.deleted = 1;
        comment.save();
        console.log(comment._id);
        
        
        await Confession.findOneAndUpdate( 
            {_id: comment.confessionID}, 
            { $pull: {comments: comment._id}},
            {new:true});
        
        
            
        return res.status(200).json({message: "comment removed", deleted: comment.deleted});
    }
}

exports.searchComments = async (req, res) => {
    
    let resultsPerPage = 15;
    let searchVar = req.body.searchVal;
    let oid = req.body.oid;
    let confessionOID = mongoose.Types.ObjectId(req.body.confessionOID);
    
    // Input: cookie, Comment._id "oid" and search criteria
    //if searchVar==1, sort by most recent 
    if (oid == "" && searchVar==1){
        var searchResults = await Comment.find({
            deleted : 0,
            confessionID : confessionOID
        })
        .populate({
            path: "voteID",
        }).limit(resultsPerPage).sort({_id: -1}).lean();
    }
    else if(oid == "" && searchVar==2){
        
        var searchResults = await Comment.find({
            deleted : 0,
            confessionID : confessionOID})
        .populate({
            path: "voteID",
        }).sort({netVotes: -1, _id: -1}).limit(resultsPerPage).lean();
    }
    else if(searchVar==1){
        var searchResults = await Comment.find({
            deleted : 0,
            confessionID : confessionOID,
            _id : {$lt: mongoose.Types.ObjectId(oid)}
            })
            .populate({
                path: "voteID",  
            }).limit(resultsPerPage).sort({_id: -1}).lean();
    }
    //if searchVar==2, sort by most popular
    else if(searchVar==2){
        var oldHigh = await Comment.findById(oid);
        
        var searchResults = await Comment.find( {
            deleted : 0,
            $and : [ { confessionID : confessionOID },
                {$or : [ { netVotes : oldHigh.netVotes, _id : {$lt : oldHigh._id } },
                 { netVotes : {$lt : oldHigh.netVotes}
                }
            ]}
            ]  
        }).populate({
            path: "voteID",
        }).sort({netVotes: -1, _id: -1}).limit(resultsPerPage).lean();
        

    }
    else {
        res.status(400).json({message : "Not a valid search type"});
        return;
    }
    //declare new temp unsaved fields 
    for(var i = 0; i < searchResults.length; i++){
        searchResults[i]["userInteracted"] = 0;        
        searchResults[i]["userCreated"] = 0;
        if(searchResults[i].userID == req.session.userId){
            searchResults[i].userCreated=1;
        }
    }

    for (var i = 0; i < searchResults.length; i++) {
        let votes = searchResults[i].voteID;
        //check if user has downvoted
        for(var j = 0; j < votes.downvoteList.length; j++){
            if(votes.downvoteList[j]==req.session.userId){
                searchResults[i].userInteracted = -1;
            }
        }
        //check if user has upvoted
        for(var j = 0; j < votes.upvoteList.length; j++){
            if(votes.upvoteList[j]==req.session.userId){
                searchResults[i].userInteracted = 1;
            }
        }
        delete searchResults[i].voteID.upvoteList;
        delete searchResults[i].voteID.downvoteList;
    }
    const result = searchResults.map(({userID, ...rest}) => ({...rest}));
    res.status(201).json(result);
}