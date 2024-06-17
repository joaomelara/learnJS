const express = require("express"); //importanto
const app = express(); //iniciando

app.get("/",function(req,res){
    res.send("Bem vindo fio")

});//pagina inicial do app

app.get("/blog/:artigo?",function(req,res){ //? => não obrigatório
    var artigo = req.params.artigo

    if(artigo){
        res.send(artigo)
    }
    else{
    
    res.send("<h1>Bem vindo ao passado</h1>")
    }
});

app.get("/ola/:nome/:empresa",function(req,res){
    var nome = req.params.nome
    var empresa = req.params.empresa
    res.send("oi "+nome+ " da empresa: "+ empresa)

});

app.get("/canal/youtube",function(req,res){
    var paia = req.query["paia"]
    if(paia){
    res.send(paia)
    }else{
        res.send("otario")
    }

});

// REQ => DADOS ENVIADOS PELO USUÁRIO
// RES => RESPOSTA ENVIADA AO USUÁRIO

app.listen(8181,function(erro){
    if(erro){
        console.log("Errou!")
    }
    else{
        console.log("Deu certo fião")
    }
})