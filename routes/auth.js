const express = require('express');

const router = express.Router();

const {register,login, logout, loginRequired, profile, emailVerify} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout",loginRequired,logout);
router.get("/profile",loginRequired, profile);
router.get("/emailVerify/:token", emailVerify);

module.exports = router;