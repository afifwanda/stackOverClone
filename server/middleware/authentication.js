const jwt = require('jsonwebtoken')
require('dotenv').config()

function authentication(req,res,next){
    const { token } = req.headers
    try {let decode = jwt.verify(token,process.env.JWT_KEY);
        req.userData = decode;
         next()
    } catch(err){
        next({status: 403, msg: 'please login first'})
    }
}

module.exports = authentication