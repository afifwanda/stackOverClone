'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Thread extends Model{}

  Thread.init({
    title:{
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter the title!'
        }
      }
    },
    description:{
      type : DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Please enter the description!'
        }
      }
    },
    UserId: DataTypes.INTEGER,
  },{sequelize, tableName:'Threads'})

  Thread.associate = function(models) {
    // associations can be defined here
    Thread.hasMany(models.Comment,{foreignKey:'ThreadId'})
    Thread.belongsTo(models.User,{foreignKey:'UserId'})
  };
  return Thread;
};