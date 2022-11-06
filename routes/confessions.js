const express = require('express');
const router = express.Router();

const {addConfession, deleteConfession, searchConfession, changeVote, information} = require("../controllers/confessions");
const {loginRequired} = require("../controllers/auth");

router.post("/addConfession", loginRequired,addConfession);
router.post("/deleteConfession", loginRequired, deleteConfession);
router.get("/searchConfession", searchConfession);
router.put("/changeVote", loginRequired, changeVote);
router.get("/information", information);

module.exports = router;