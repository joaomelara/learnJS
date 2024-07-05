const connect = require ("./database");
const sequelize = require("sequelize");

const Resposta = connect.define("respostas", {
    corpo:{
        type: sequelize.TEXT,
        allowNull : false,
    },
    perguntaID:{
        type: sequelize.INTEGER,
        allowNull : false,
    }
});

Resposta.sync({force: false}).then(()=>{
    console.log("TABELA CRIADA DE RESPOSTA");
}).
catch((msgErro)=>{
    console.log("deu pau cara NA RESPOSTA")
}); //se não tiver, cria a tabela no bd


module.exports = Resposta;