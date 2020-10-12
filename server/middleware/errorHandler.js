function errorHandler(err,req,res,next){
    if(err.name === "JsonWebTokenError"){
        res.status(401).json({
            "msg" : "authentication fail, please check your email/password"
        })
    } else{
        res.status(err.status).json(err)
    }
    

}

module.exports = errorHandler