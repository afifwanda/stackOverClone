const {Thread} = require('../models')
require('dotenv').config()

class threadController{

  static getThreads(req,res,next){
    Thread.findAll()
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err=>{
      next({status: 500, msg: 'Internal server error!'}) 
    })
  }

  static getSpecificThread(req,res,next){
    let params = req.params.id
    Thread.findOne({where:{id:params}})
    .then(result=>{
      if(result){
        res.status(200).json(result)  
      } else{
        next({status: 404, msg: 'Data not found!'})
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static getMyThread(req,res,next){
    Thread.findAll({where:{UserId : req.userData.id}})
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err=>{
      next({status: 501, msg: 'Internal server error!'})
    })
  }

  static addThread(req,res,next){
    let obj = {
      title : req.body.title,
      description : req.body.description,
      UserId : req.userData.id
    }
    Thread.create(obj)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>{
      next({status: 500, msg: 'Field cannot be blank!'})
    })
  }

  static updateThread(req,res,next){
    let params = Number(req.params.id)
    let obj = {
      title : req.body.title,
      description : req.body.description,
    }
    Thread.update(obj,{where:{id:params}})
    .then(result=>{
        if(result[0]){
          res.status(200).json(obj)  
        }
        else{
         next({status: 404, msg: 'Data not found!'})  
        }
    })
    .catch(err=>{
    console.log(err)
        next({status: 501, msg: 'Internal server error!'}) 
    })
  }

  static deleteThread(req,res,next){
    let params = Number(req.params.id);
    let thread = null;
    Thread.findOne({where:{id:params}})
    .then(result=>{
        if(result){
        thread = result;
        return Thread.destroy({where:{id:params}})
        } else{
            next({status: 404, msg: 'Data not found!'})
        }
    })
    .then(data=>{
         res.status(200).json(thread)  
    })
    .catch(err=>{
        next({status: 501, msg: 'Internal server error!'})
    })
  }
}

module.exports = threadController