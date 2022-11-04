const path = require('path');
const express = require("express");
const expressSession = require("express-session");

const authRoutes = require('./routes/auth');
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

app.use('/api/v1/auth',authRoutes);
app.use(express.static("frontend/build"));
app.use(express.static("public"));
app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

/*app.get('/', (req, res) => {
    if(IS_PRODUCTION){
        app.use(express.static('frontend/build'));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
        });
    }
})*/

module.exports = app; 
