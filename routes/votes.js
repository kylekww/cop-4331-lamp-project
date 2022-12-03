const express = require('express');
const router = express.Router();

const {changeVote,setVote} = require("../controllers/votes");
const {loginRequired} = require("../controllers/auth");

router.put("/changeVote", loginRequired, changeVote);
router.post("/setVote",setVote);

module.exports = router;