'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Tip',
            'AuthorId',
            {type: Sequelize.INTEGER}
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Tip', 'AuthorId');
    }
};
