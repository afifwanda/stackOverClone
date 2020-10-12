'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  const bcrypt = require('bcrypt')

  class User extends Model{}
  User.init(
    {
      name: DataTypes.STRING,
      email:{
        type : DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please enter your email!'
          }
        }
      },
      password:{
        type : DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Please enter your password!'
          }
        }
      },
    }, {sequelize,tableName : 'Users', hooks:{
      beforeCreate : (instance,options)=>{
        return bcrypt.hash(instance.password, 10)
        .then(function(hash) {
        instance.password = hash
        })
      }
    }}
  )


  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Thread, {foreignKey: 'UserId'})
    User.hasMany(models.Comment, {foreignKey: 'UserId'})
  };
  return User;
};