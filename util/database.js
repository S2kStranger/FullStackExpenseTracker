const Sequelize = require('sequelize');

const sequelize = new Sequelize('expensesdata','root','S2kMySQL',{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;