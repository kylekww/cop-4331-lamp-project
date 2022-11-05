const express = require('express');
const router = express.Router();

const {addConfession, deleteConfession, searchConfession, changeVote, information} = require("../controllers/confessions");

router.post("/addConfession", addConfession);
router.post("/deleteConfession", deleteConfession);
router.get("/searchConfession", searchConfession);
router.put("/changeVote", changeVote);
router.get("/information", information);

module.exports = router;