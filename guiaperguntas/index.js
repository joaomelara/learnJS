const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connect = require("./database/database")
const PerguntaModel = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
const { where } = require("sequelize");

connect
    .authenticate()
    .then(()=>{
       console.log("Conectado") 
    })
    .catch((msgErro) =>{
        console.log("Deu erro na conexão aqui ó")
    })

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); //decodifica dados enviados pelo formullário para js
app.use(bodyParser.json()); //API

app.get("/",(req,res) =>{
    PerguntaModel.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then(pergunta => {
        res.render("home",{
            pergunta:pergunta});
    })
   

    
})

app.get("/perguntar",(req,res)=>{
    res.render("index")
})

app.post("/salvarpergunta",(req,res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    PerguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/")
    }).catch((msgErro)=>{
        
    });
})

app.get("/pergunta/:id",(req, res)=>{
    var id = req.params.id;
    PerguntaModel.findOne({
        where: {id:id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaID : pergunta.id},
                order:[['id','DESC']]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas:respostas
            })

            
            })
        }
        else{
            res.redirect("/")
        }
    }).catch(()=>{
        console.log("deu pau aqui ó");
    })
})

app.post("/salvarresposta",(req,res) =>{
    var corpo = req.body.corpo;
    var perguntaID = req.body.perguntaID;
    Resposta.create({
        corpo:corpo,
        perguntaID:perguntaID,
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaID)
    }).catch((msgErro)=>{
        
    });
})


app.listen(8080,(erro)=>{
    if (erro){
        console.log("Erro ao rodar");
    }
    else{
    console.log("App rodando");
    }


})











// const express = require("express");
// const app = express();

// app.set("view engine","ejs");
// app.use(express.static('public'));

// app.get("/:nome/:lang",(req,res) =>{
//     var nome = req.params.nome;
//     var lang = req.params.lang;
//     var exibirMgs = false;

//     var produtos = [
//         {nome : "Doritos", preco: 3.14},
//         {nome : "Coca Cola", preco: 5.00},
//         {nome : "Leite", preco: 1.45},
//         {nome : "Carne", preco: 6.45},
//     ]

//     res.render("index",{
//         nome:nome,
//         lang:lang,
//         empresa:"paia",
//         inscritos:"300",
//         msg : exibirMgs,
//         produtos : produtos,
//     })
// })

// app.listen(8080,(erro)=>{
//     if (erro){
//         console.log("Erro ao rodar");
//     }
//     else{
//     console.log("App rodando");
//     }
// })





// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width-device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Guia de Perguntas</title>
//     <link rel="stylesheet" href="/css/style.css">
//   </head>
//   <body>
//     <h1>Guia de perguntas!</h1>
//     <hr>
//     <h3>Lista de perguntas</h3>

//     <p>Nome: <%= nome %></p>
//     <p>Empresa: <%= empresa %></p>
//     <p>Inscritos: <%= inscritos %></p>
//     <p>Linguagem: <%= lang %></p>

//     <% if(msg){ %> Só usa o = quando quer pegar o valor de uma var
//     <h3>Isso é uma mensagem de erro!</h3>
//     <%}else{%>
//     <h3>Tudo certo!</h3>
//     <%}%>

//     <% produtos.forEach((produto)=>{%>
//         <hr>
//         <h4><%= produto.nome %></h4>
//         <h3><%= produto.preco %></h3>
//     <% }) %>
//   </body>
// </html>