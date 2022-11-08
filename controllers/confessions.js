const Confession = require('../models/confession');
const Votes = require('../models/votes');
const User = require('../models/user');
const _ = require('lodash');
const addConfessionValidator = require('../validators/addConfession');



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
    let query = req.body.query;
    //if searchVar==1, sort by most recent 
    if(searchVar==1){
        var searchResults = await Confession.find(
            {"confession": {$regex: '.*' + query + '.*'}}).
            limit(resultsPerPage).sort({timestamps: -1}).lean();
    }

    //if searchVar==2, sort by most popular
    if(searchVar==2){
        var searchResults = await Confession.find(
            {"confession": {$regex: '.*' + query + '.*'}}).
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


//confession information
exports.information = async (req, res) => {
    // returns all of the information about the confession. 
    confession = await Confession.findById(req.body.id);
    return res.json({confession: confession.toObject()});
}
