const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class userController{
  
  static userRegister(req,res,next){
    const obj = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
    }
    User.create(obj)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>{
      if(err.errors[0].message === 'email must be unique'){
          next({status: 400, msg: 'email already used!'})
          } else{
          next({status: 500, msg: 'Field cannot be blank!'})
          }
    })
  }

  static userLogin(req,res,next){
    let email = req.body.email
    let password = req.body.password
    User.findOne({where:{email:email}})
    .then(data=>{
      return bcrypt.compare(password,data.password)
      .then(result=>{
        if(result === true){
            let token = jwt.sign({email:data.email,id:data.id},process.env.JWT_KEY)
            res.status(200).json({ token })
        } else{
            next({status: 400, msg: 'Wrong email/password!'})
        }
       })
    })
    .catch(err=>{
      next({status: 500, msg: 'Internal server error!'})
    })
  }
}

module.exports = userController