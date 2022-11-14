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
    //name: "hushucf.herokuapp.com",
    service: "outlook",
    secureConnection: false, 
    port: 587, 
    tls: {
       ciphers:'SSLv3'
    },
    host: "stmp-mail.outlook.com",
    auth: {
        user: "jankbox96@outlook.com",
        pass: "++lower_truck_938++"
    }
});

sendEmail.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
});

exports.register = async(req,res)=>{
    username = req.body.username;
    email = req.body.email;
    lowerCaseUsername = username.toLowerCase();
    lowerCaseEmail = email.toLowerCase();
      
    usernameTaken = await User.findOne({'username': username}).collation({ 'locale' : 'en_US' , 'strength': 2});
    emailTaken = await User.findOne({'email': email}).collation({ 'locale' : 'en_US' , 'strength': 2});

    if(usernameTaken){
        return res.status(409).json({message: "Username has been taken"});
    }
    if(emailTaken){
        return res.status(409).json({message: "Email address has already been used"});
    }
    
    const validationResult = registerValidator({...req.body, username: lowerCaseUsername});
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
        user.save()
        console.log(user.emailVerifyToken);

        sendEmail.sendMail
        ({
            from: "jankbox96@outlook.com",
            to: user.email,
            subject: "Hush UCF email verification",
            text: 
                `
                To register for hush UCF, please follow the link to verify your account.
                https://${req.headers.host}/verify/${user.emailVerifyToken}        
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
        message: "you are registered successfully", 
        user: _.omit(user.toObject(), dbSecretFields),
    });
};

exports.emailVerify = async (req,res, next) => {
    console.log(req.params.token);
    const user = await User.findOne({emailVerifyToken: req.params.token});
    console.log(user?.toObject());

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
    // add case-insensitivity and ignore deleted users
    const validationResult = loginValidator(req.body);
    if(validationResult !== true){
        return res.status(400).json({message: validationResult});
    }

    const user = await User.findOne({'username': req.body.username}).collation({ 'locale' : 'en_US' , 'strength': 2});
    if(!user){
        return res.status(404).json({message: "username does not exist."});
    }

    if(user.deleted == true){
        return res.status(404).json({message: "this account does not exist"});
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

exports.deleteAccount = async (req, res) => {
    user = await User.findById(req.session.userId);
    if(!user){
        return res.status(403).json({message: "this account does not exist"});
    }
    user.deleted = 1;
    delete req.session.userId;
    await user.save();
    return res.status(200).json({message: "account deleted successfully"});
}

exports.editProfile = async (req, res) => {
    user = await User.findById(req.session.userId);

    if(req.body.username){
        usernameTaken = await User.findOne({'username': req.body.username}).collation({ 'locale' : 'en_US' , 'strength': 2});

        if(usernameTaken){
            return res.status(409).json({message: "Username has been taken"});
        }
    }

    // if we are changing the email address
    if(req.body.email){
        if(req.body.password){
            const hashedPassword = await bcrpyt.hash(req.body.password, 12);
            user = await User.findByIdAndUpdate({_id: req.session.userId}, 
            {...req.body, password: hashedPassword, verified: false}, {new: true});
        }
        else{
            user = await User.findByIdAndUpdate({_id: req.session.userId}, 
            {...req.body, verified: false}, {new: true});
        }

        user.emailVerifyToken = crypto.randomBytes(64).toString("hex");
        await user.save();

        sendEmail.sendMail
        ({
            from: "jankbox96@outlook.com",
            to: user.email,
            subject: "Hush UCF email verification",
            text: 
                `
                We see that you've changed your email address.
                To re-register for hush UCF, please follow the link to verify your account.
                https://${req.headers.host}/verify/${user.emailVerifyToken}   
                `
        }, 
            function(error, info)
            {
                if(error) throw Error(error);
                console.log("Email sent successfully");
                console.log(info);
            }
        );

        await user.save();
        delete req.session.userId;
        return res.status(200).json({message: "account info updated successfully. Please check your email to reverify.",
                                    user: _.omit(user.toObject(),dbSecretFields)});
    }
    else{
        if(req.body.password){
            const hashedPassword = await bcrpyt.hash(req.body.password, 12);
            user = await User.findByIdAndUpdate({_id: req.session.userId}, 
            {...req.body, password: hashedPassword, verified: true}, {new: true});
        }
        else{
            user = await User.findByIdAndUpdate({_id: req.session.userId}, 
            {...req.body, verified: true}, {new: true});
        }
        
        await user.save();
        return res.status(200).json({message: "account info updated successfully",
                                    user: _.omit(user.toObject(),dbSecretFields)});
    }
}





exports.profile = (req,res)=> {
    res.json({user: _.omit(req.user.toObject(),dbSecretFields)});
};