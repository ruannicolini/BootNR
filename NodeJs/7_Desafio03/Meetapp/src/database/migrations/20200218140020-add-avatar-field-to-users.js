'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // nome tabela
      'avatar_id', //nome coluna
      {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,

      }
    );  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users','avatar_id');  
  }
};