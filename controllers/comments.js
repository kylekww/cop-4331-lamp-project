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
            confessionID: confession._id, voteID: initVotes});
    // add comment to confessions
    confession.comments.push(comment);
    confession.save();

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
    let resultsPerPage = 1;
    let searchVar = req.body.searchVal;
    let confessionID = req.body.confessionID;
    let oid = req.body.oid;
    //if searchVar==1, sort by most recent 
    
    if(searchVar == 1 && oid == ""){
        console.log('test');
        var confession = await Confession.findById(confessionID)
            .populate({
                path : "comments",
                options : {
                    sort: {_id : -1},
                    limit: resultsPerPage
                }
            });
    }
    else if(searchVar == 2 && oid == ""){
        var confession = await Confession.findById(confessionID)
            .populate({
                path : "comments",
                options : {
                    sort: {_id : -1,netVotes:1},
                    limit: resultsPerPage
                }
            });
    }

    else if(searchVar == 1){
        console.log("test");
        var confession = await Confession.findById(confessionID)
            .populate({
                path : "comments",
                perDocumentLimit: 2,
                match : {_id : {$lt : oid}}
            });
    }
    else if(searchVar == 2){
        var confession = await Confession.findById(confessionID)
            .populate({
                path : "comments",
                options : {
                    sort: {_id : -1,netVotes:1},
                    limit: resultsPerPage
                }
            });
    }



    returnVal = confession.comments;
    //returnVal.sort({_id:-1})
    //.populate({path: 'Members', options: { sort: { 'created_at': -1 } } })

    /*let searchResults = confession.comments;*/

    console.log(returnVal)
    res.status(201).json(returnVal);
}