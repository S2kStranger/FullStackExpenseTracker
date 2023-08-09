const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const expenses = sequelize.define('expense', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNULL : false,
        primaryKey : true
    },

    category : Sequelize.STRING,
    price : {
        type : Sequelize.DOUBLE,
        allowNULL : false
    },

    description : {
        type : Sequelize.TEXT,
    }
});

module.exports = expenses;