const express = require('express');
const router = express.Router();

const {changeVote} = require("../controllers/votes");
const {loginRequired} = require("../controllers/auth");

router.put("/changeVote", loginRequired, changeVote);


module.exports = router;