'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Threads', 'UserId', Sequelize.INTEGER);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Threads', 'UserId');
    
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      
    */
  }
};