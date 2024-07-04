const sequelize = require("sequelize");
const connect = require("./database");

const Pergunta = connect.define("pergunta", {
    titulo:{
        type: sequelize.STRING,
        allowNull : false,
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull : false,
    }
});

Pergunta.sync({force: false}).then(()=>{
    console.log("TABELA CRIADA");
}).
catch((msgErro)=>{
    console.log("deu pau cara")
}); //se não tiver, cria a tabela no bd


module.exports = Pergunta;