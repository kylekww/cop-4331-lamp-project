const express = require('express');
const router = express.Router();

const {addComment, deleteComment, searchComments} = require("../controllers/comments");
const {loginRequired} = require("../controllers/auth");
const {changeVote} = require("../controllers/confessions");

router.post("/addComment", loginRequired,addComment);
router.post("/deleteComment", loginRequired, deleteComment);
router.get("/searchComments", loginRequired, searchComments);

module.exports = router;