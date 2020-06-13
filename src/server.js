const express = require("express"); // Faz a requisição do express
const server = express(); // Pega o objeto express

// Pegar o objeto(banco de dados) de db do arquivo db.js
const db = require("./database/db"); 


server.use(express.static("public")); // Linha responsável por transformar a pasta public comum ao node. Deixa o conteúdo dela acessível sem precisar criar o caminho todo.

// habilitar o uso do request.body na nossa aplicação

server.use(express.urlencoded({extended: true}));


// utilizando template engine 
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    // Primeiro parâmetro é onde os arquivos html estão
    // O segundo parâmetro é o objeto com o server e o noCache

    express: server, // Referencia onde o express está armazenado
    noCache: true // tira a versão velha que fica salva no cache
});

// Configurar caminhos da minha aplicação
// página inicial

server.get("/", (request, response) => {
    // O get pega uma rota => o get responde uma página 
    // É passado como parâmetro uma requisição e uma resposta
    // requisição é um pedido, enquanto response pega uma resposta
    
    return response.render("index.html"); // O send envia a resposta pelo servidor / O sendFile envia um arquivo
    // __dirname é uma variável global que serve para dizer o caminho onde o arquivo está localizado
    // Quando utiliza o render ele renderiza o arquivo
    // É passado apenas o nome do arquivo porque o nunjucks já foi configurado para pegar a pasta com os htmls
    // O segundo parâmetro do .render é um objeto que vai ter o nome das variável a serem substituídas no html
})

server.get("/create-point", (request, response) => {

    //request.query => Query Strings da nossa url, já retorna no formato de objeto
    

    return response.render("create-point.html"); 
})

server.post("/savepoint", (request, response) =>{
    console.log(request.body.cnpjValor);
    // O post é utilizado para enviar dados escondidos na query
    
    // req.body => O corpo do formulário, retorna o objeto
    //console.log(request.body)

    //Inserir dados no banco de dados
    
    const query = `
    INSERT INTO points (
            cnpj,
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
        request.body.cnpjValor,
       request.body.image,
       request.body.name,
       request.body.address,
       request.body.address2,
       request.body.state,
       request.body.city,
       request.body.items,

    ];

    function afterInsertData(err) {
        if(err) {
            console.log(err);
            return response.render("create-point.html", {error: true});
        }

        console.log("Cadastrado com sucesso");
        console.log(this); // Serve para mostrar o objeto criado
        return response.render("create-point.html", {saved: true});
    }

    db.run(query, values, afterInsertData);
    
})

server.get("/search", (request, response) => {

    const search = request.query.state; // pega a query do state
    console.log(search);

    if (search == "") {
        // Pesquisa Vazia
        return response.render("search-results.html", { total: 0});
    }

    if (search == "Todos os estados") {
        db.all(`SELECT * FROM points`, function(err, rows) {
            // o like com o argumento entre %  quer dizer que ele vai procurar uma palavra que tenha semelhança com a passada.
            if(err) {
                return console.log(err);
            }
    
            console.log("Aqui estão os registros de todos os estados");
            console.log(rows);
    
    
            const total = rows.length; // Retorna o total de linha achado no select
            // mostrar a página html com os dados do banco de dados
            return response.render("search-results.html", { places: rows, total: total}); 
        });
    } else {
        db.all(`SELECT * FROM points WHERE state LIKE '%${search}%'`, function(err, rows) {
            // o like com o argumento entre %  quer dizer que ele vai procurar uma palavra que tenha semelhança com a passada.
            if(err) {
                return console.log(err);
            }
    
            console.log("Aqui estão os seus registros");
            console.log(rows);
    
    
            const total = rows.length; // Retorna o total de linha achado no select
            // mostrar a página html com os dados do banco de dados
            return response.render("search-results.html", { places: rows, total: total}); 
        });
    }


    // pegar os dados do banco de dado

    

})


server.listen(3000); // Faz o servidor ligar na porta 3000



// nodemon serve para automatizar a atualização do servidor