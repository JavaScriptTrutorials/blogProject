const jwt = require("jsonwebtoken");
const config = require('../config');
/*
module.exports = function (req, res, next) {
   const token = req.header("auth-token");
   if (!token) return res.status(400).send("Access Denied!, no token            entered");
   try {
      const verified = jwt.verify(token, process.env.jwtSecret);
      req.user = verified;
      next();
      } catch (err) {
           res.status(400).send({ 
                     error: "auth failed, check auth-  token222" 
                  });
       }
};
*/
module.exports = (req, res, next) => {
    const token = res.locals.token;
    // check json web token exists and verified
    if(token){
        jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                next(err);
            }
            else{
                console.log("###", decodedToken);
                res.locals.user = decodedToken;
                next();
            }
        });
    }
    else {
        return res.status(400).json({error: "Access Denied!, no token entered"});
    }
  }