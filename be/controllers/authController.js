const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config');

// handle errors
const handleErrors = (err) => {
    let errors = {
        email: "",
        password: ""
    };

    // validations errors
    if(err.message.includes('user validation failed:')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    // duplicate error code
    if(err.code === 11000){
        errors.email = "that email is already registered";
    }
    // incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered';
    }
    // incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorect';
    }
    return errors;
}

// create token
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds, cookies in miliseconds

const createToken = (id, role) => {
    return jwt.sign({id, role}, jwtSecret, {
        expiresIn: maxAge
    });
};

module.exports.signup_post = async (req, res) => {
    const {email, password, role} = req.body;
    try{
        const user = await User.create({email, password, role});
        const token = createToken(user._id, user.role);
        //res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err){
                console.log(err.message);
            }
            else{
                console.log("register", decodedToken);
            }
        });
        res.status(201).json({user: user, token});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    } 
}
module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id, user.role);
        //res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        
        res.status(200).json({user: user, token});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}