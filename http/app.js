var http = require("http")

http.createServer(
    function(requisicao,resposta){
        resposta.end("<h1>Bem vindo</h1><br><h4>paia</h4>")
    }
).listen(8181);
console.log("paia")