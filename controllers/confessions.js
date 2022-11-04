const Confession = require('../models/confession');
const User = require('../models/user');
const _ = require('lodash');
const addConfessionValidator = require('../validators/addConfession');

exports.addConfession = async (req, res) => {
    const validationResult = addConfessionValidator(req.body);
    if(validationResult !== true){
        return res.status(400).json({message: validationResult});
    }

    const confession = await Confession.create({...req.body, deleted: 0});

    return res.status(201)
    .json({
        message: "confession posted", 
        confession: confession.toObject()
    });
}

exports.deleteConfession = async (req, res) => {
    confession = await Confession.findById(req.params.id);
    // if we don't want the id in the url: Confession.findById(req.body.confessionID); (change route to be rid of id as well)

    // Get the id of the user who requested the delete
    // If user.moderator === true, confession.deleted = -1
    // else if user.moderator === false, confession.deleted = 1

    user = await User.findById(req.body.userId);
    if(user.moderator){
        confession.deleted = -1;
        return res.status(201).json({message: "This post was deleted by a moderator"});
    }
    else if(!user.moderator){
        confession.deleted = 1;
        return res.status(201).json({message: "This post was deleted successfully"});
    }
}

exports.searchConfession = async (req, res) => {
    // Input: usrID and search criteria
    // (confessionsarr[] = Confession.findAll({deleted: {$eq 0}}, {$all: req.body})) // query likely wrong
    // Output: array of confessions objects matching search criteria
    let resultsPerPage = 15;
    let searchResults = await Confession.find({deleted: {$eq: 0}}, {$all: req.body}).limit(resultsPerPage);
    
    // if(confessionsarr is empty)
    // res.status(404).json({message: "No results found"});

    // can sort by date (newest, oldest) or by most popular (highes netvotes)

    let searchedConfessions = new Array();

    // Check all confessions which have not been marked as deleted (figure out lazy load)
    /* for(int i = 0; i < confessionsarr.length; i++){
            if(Confession.findOne({downVoteList: userID}) != null)
             confession.userInteracted = -1;
            else if(Confession.findOne({upVoteList: userID}) != null)
                confessionarr[i].userInteracted = 1; 
            else
                confessionsarr[i].userInteracted = 0;  
        
            confessionsarr[i].netVotes = (confessionsarr[i].upvoteList.length - confessionsarr[i].downvoteList.length);
            searchedConfessions.push(confessionsarr[i]); // or however we add an object to an array
        }
    */
    
    res.status(201).json({searchResults}, {message: "results found"});
}

exports.changeVote = async (req, res) => {
    // if userinteacted === -1 and we are changing to upvote
    // if we find the user's id in the downvote list we take
    // upvotelist++, downvoteList--
    // if userinteracted === 1 and we are changing to downvote
    // upvotelist--, downvotelist++
    // if we are trying to re-upvote or re-downvote simply do not add
    // so if userinteacred === 1 and we are trying to upvote
    // ignore and same for if userinteracted === -1 and we are trying to downvote
    confession = await Confession.findById(req.params.id);

    // we want to upvote
    if(req.body.vote === 1){
    }

    

}

exports.information = async (req, res) => {
    // returns all of the information about the confession. 
    return res.status(201).json({confession: req.confession.toObject()});
}

