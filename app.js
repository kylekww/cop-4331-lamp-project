const path = require('path');
const express = require("express");
const expressSession = require("express-session");

const authRoutes = require('./routes/auth');
const confessionRoutes = require('./routes/confessions');
const commentRoutes = require('./routes/comments');
const voteRoutes = require('./routes/votes')
const {SESSION_SECRET, IS_PRODUCTION} = require('./configs');
const app = express();

app.use(express.json({limit: "1KB"}));
app.use(expressSession({
    name: "hush.sid",
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        secure: IS_PRODUCTION, 
        maxAGE: 1000*60*60*24, //1 day 
    },
}));
//api routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/confessions', confessionRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/votes',voteRoutes)

//front end routes
app.use(express.static("frontend/build"));
app.use(express.static("public"));
app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

module.exports = app; 
