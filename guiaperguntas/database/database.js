const Sequelize = require("sequelize");
const connect = new Sequelize('guiaperguntas','root','fbradesco',{
    host:'localhost',
    dialect: 'mysql'
});    

module.exports = connect;