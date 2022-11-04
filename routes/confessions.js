const express = require('express');
const router = express.Router();

const {addConfession, deleteConfession, searchConfessions, changeVote, information} = require("../controllers/confessions");

router.post("/addConfession", addConfession);
router.post("/:id/deleteConfession", deleteConfession);
// router.post("/searchConfessions", searchConfessions);
router.put("/:id/changeVote", changeVote);
router.get("/information", information);

module.exports = router;