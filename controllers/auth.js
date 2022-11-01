const bcrpyt = require("bcrypt");
const _ = require('lodash')
const User = require('../models/user');
const registerValidator = require('../validators/register');
const loginValidator = require('../validators/login');
const {dbSecretFields} = require('../configs');
const nodemailer = require('nodemailer'); 
const crypto = require('crypto');

const sendEmail = nodemailer.createTransport
({
    service: "outlook",
    // host: "localhost:3000" /*"hushucf.herokuapp.com"*/,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.register = async(req,res)=>{
    const validationResult = registerValidator(req.body);
    if(validationResult !== true){
        return res.status(400).json({message: validationResult});
    }

    const hashedPassword = await bcrpyt.hash(req.body.password, 12);
    const user = await User.create({...req.body,password: hashedPassword})
    req.session.userId = user.id;

    // Email verification:
    if(!user.verified)
    {
        user.emailVerifyToken = crypto.randomBytes(64).toString("hex");

        sendEmail.sendMail
        ({
            from: "jankbox96@outlook.com",
            to: user.email,
            subject: "Hush UCF email verification",
            text: 
                `
                To register for hush UCF, please follow the link to verify your account.
                http://${req.headers.host}/api/v1/auth/emailVerify/token=${user.emailVerifyToken}        
                `
        }, 
            function(error, info)
            {
                if(error) throw Error(error);
                console.log("Email sent successfully");
                console.log(info);
            }
        );
    }

    return res.status(201)
    .json({
        message: "you are registered successfully.  Please continue to your email to verify your account.", 
        user: _.omit(user.toObject(), dbSecretFields),
    });
};

exports.emailVerify = async (req,res) => {
    const user = await User.findOne({emailVerifyToken: req.query.token});

    if(!user){
        return res.status(502).json({message: "verification could not be completed"});
    }
    
    user.emailVerifyToken = null; //So it is unusable more than once
    user.verified = true;
    await user.save();
    //console.log(user.verified); //just to test that the value is changed in the db
    return res.status(201).json({message: "verification successful"});

}

exports.login = async (req,res)=>{
    const validationResult = loginValidator(req.body);
    if(validationResult !== true){
        return res.status(400).json({message: validationResult});
    }

    const user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(404).json({message: "username does not exist."});
    }

    const isPasswordCorrect = await bcrpyt.compare(req.body.password, user.password);

    if(!isPasswordCorrect){
        return res.status(401).json({message: "password incorrect"});
    }

    if(user.verified === false){
        return res.status(403).json({message: "verify your email address to login"})
    }

    req.session.userId = user.id; 

    res.json({message: "you are successfully logged in."});
};

exports.logout = (req,res)=> {
    delete req.session.userId;
    return res.json({message: "you have logged out"});
};

exports.loginRequired = async (req,res,next ) => {
    if(!req.session || !req.session.userId){
        return res.status(403).json({message: "You must login to access this"});
    }
    req.user = await User.findById(req.session.userId);
    if(!req.user){
        return res.status(403).json({message: "this user id does not exist"});
    }
    next();
};

exports.profile = (req,res)=> {
    res.json({user: _.omit(req.user.toObject(),dbSecretFields)});
};