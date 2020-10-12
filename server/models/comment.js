'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Comment extends Model{}

  Comment.init({
    comments:{
      type : DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Please enter the comments!'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    ThreadId: DataTypes.INTEGER
  },{sequelize, tableName:'Comments'})

  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User,{foreignKey:'UserId'})
    Comment.belongsTo(models.Thread,{foreignKey:'ThreadId'})
  };
  return Comment;
};