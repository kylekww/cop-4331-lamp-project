const express = require('express');

const router = express.Router();

const {register,login, logout, loginRequired, profile,} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout",loginRequired,logout);
router.get("/profile",loginRequired, profile);

module.exports = router;