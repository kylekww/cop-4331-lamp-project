const express = require('express');

const router = express.Router();

const {register,login, logout, loginRequired, profile, 
    emailVerify, editProfile, deleteAccount, passwordReset, resetLink} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout",loginRequired,logout);
router.get("/profile",loginRequired, profile);
router.post("/emailVerify/:token", emailVerify);
router.post("/editProfile", editProfile);
router.post("/deleteAccount", deleteAccount);
router.post("/passwordReset/:token", passwordReset);
router.post("/resetLink", resetLink);

module.exports = router;