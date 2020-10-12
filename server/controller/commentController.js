const {Comment,Thread} = require('../models')
require('dotenv').config()

class commentController{
  
  static getThreadComment(req,res,next){
    let params = req.params.threadId
    Comment.findAll({where:{ThreadId:params}})
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err=>{
      next({status: 500, msg: 'Internal server error!'}) 
    })
  }

  static getMyComment(req,res,next){
    Comment.findAll({include:Thread,where:{UserId:req.userData.id}})
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err=>{
      next({status: 501, msg: 'Internal server error!'})
    })
  }

  static addComment(req,res,next){
    let obj = {
      comments : req.body.comments,
      UserId : req.userData.id,
      ThreadId : req.body.threadId,
    }
    Comment.create(obj)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>{
      next({status: 500, msg: 'Field cannot be blank!'})
    })
  }

  static updateComment(req,res,next){
    let params = Number(req.params.id)
    let obj = {
      comments : req.body.comments,
    }
    Comment.update(obj,{where:{id:params}})
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

  static deleteComment(req,res,next){
    let params = Number(req.params.id);
    let comment = null;
    Comment.findOne({where:{id:params}})
    .then(result=>{
        if(result){
        comment = result;
        return Comment.destroy({where:{id:params}})
        } else{
            next({status: 404, msg: 'Data not found!'})
        }
    })
    .then(data=>{
         res.status(200).json(comment)  
    })
    .catch(err=>{
        next({status: 501, msg: 'Internal server error!'})
    })
  }
  
}

module.exports = commentController