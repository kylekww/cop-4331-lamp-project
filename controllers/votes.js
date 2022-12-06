const Confession = require('../models/confession');
const Votes = require('../models/votes');
const User = require('../models/user');
const Comment = require('../models/comments')


exports.changeVote = async (req, res) => {

    //input: 
    //1 if upvote, -1 if downvote
    //id: id of confession or comment 
    //type: 1 if confession, 2 if comment
    if(req.body.type==1){
        var element = await Confession.findById(req.body.id);
    }
    else if(req.body.type==2){
        var element = await Comment.findById(req.body.id);
    }
    else{
        return res.status(404).json({message: "Could not find element"});
    }

    if(!element){
        console.log(element);
        return res.status(404).json({message: "Could not find element"});
    }

    let votes = await Votes.findById({_id: element.voteID});  

    if(element.deleted === 1 || element.deleted === -1){

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
            element.netVotes += 2;
            // votes.netVotes=votes.netVotes+2;
            votes.save();
            element.save();
            return res.status(201).json({
                message: "vote changed from downvote to upvote",
                "netVotes": element.netVotes
            });
        }
        ////Votes.find({ upvoteList: voterID });
        else if(inList==1){
            votes.upvoteList.pull(voterID);
            element.netVotes--;
            // votes.netVotes--;
            votes.save();
            element.save();

            return res.status(201).json({
                message: "vote changed from upvote to none",
                "netVotes": element.netVotes
            });
        }
        else{
            votes.upvoteList.push(voterID);
            element.netVotes++;
            // votes.netVotes++;
            element.save()
            votes.save();
            return res.status(201).json({
                message: "vote added as upvote",
                "netVotes": element.netVotes
            });
        }
    }
    else if(req.body.vote === -1){ // we want to downvote post
        if(inList==1){
            votes.upvoteList.pull(voterID);
            votes.downvoteList.push(voterID);
            element.netVotes -= 2;
            // votes.netVotes = votes.netVotes - 2; 
            votes.save();
            element.save();

            return res.status(201).json({
                message: "vote changed from upvote to downvote",
                "netVotes": element.netVotes
            });
        }
        else if(inList==-1){
            votes.downvoteList.pull(voterID);
            element.netVotes++;
            // votes.netVotes++;
            votes.save();
            element.save();

            return res.status(201).json({
                message: "vote changed from downvote to none",
                "netVotes": element.netVotes
            });
        }
        else{
            votes.downvoteList.push(voterID);
            element.netVotes--;
            // votes.netVotes--;
            votes.save();
            element.save();

            return res.status(201).json({
                message: "vote added as downvote",
                "netVotes": element.netVotes
            });
        }
    }
}

exports.setVote = async (req, res) => {
    let id = req.body.id;

    if(req.body.type==1){
        var element = await Confession.findById(id);
    }
    else if(req.body.type==2){
        var element = await Comment.findById(id);
    }
    else{
        return res.status(404).json({message: "Could not find element"})
    }
    
    element.netVotes = req.body.voteNum;
    element.save()
    return res.status(201).json(element.toObject())
}