// Importar a dependencia do sqlite
const sqlite3 = require("sqlite3").verbose() // o verbose() diz para retornar informações do que está acontecendo com o db

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db"); // criar um arquivo chamado "database.db" no caminho do argumento
    // Usar no console => node src/database/db.js para rodar apenas esse arquivo

// Utilizar o objeto de banco de dados para as operações


db.serialize(() => {
    // Criar uma tabela com comandos SQL=> comando para fazer isso 
    
    db.run(`
        CREATE TABLE IF NOT EXISTS points (
            cnpj INTEGER PRIMARY KEY,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `); 




   /*db.all(`SELECT * FROM points`, function(err, rows) {
    if(err) {
        return console.log(err);
    }

    console.log("Aqui estão os seus registros");
    console.log(rows);
})*/




    /**
            IF NOT EXISTS => cria uma tabela apenas se ela não existe.
            Os comandos são separados por vírgula (obs: o último não tem vírgula)
        */ 

    // Inserir dados na tabela

    /*
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
        "0000000000",
        "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "Paperside",
        "Rua pensilvânia",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ];

    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Cadastrado com sucesso");
        console.log(this); // Serve para mostrar o objeto criado
    }

    db.run(query, values, afterInsertData);

    */
        /**
            No primeiro campo insere os campos
            No segundo campo insere os valores
            A ordem deve ser correspondente
            As ? é quando não se sabe o valor e vai trocar mais tarde
            O segundo parâmetro do db.run é um array com os dados que substituirão as interrogações
            O terceiro parâmetro é uma função callback que sempre executa
         */


    // Consultar os dados da tabela


    /*db.all(`SELECT * FROM points`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        console.log("Aqui estão os seus registros");
        console.log(rows);
    });*/

        /**
            db.all() serve para fazer o select da tabela
            o parâmetro rows na function de callback são os registros da tabela => retorna cada linha da tabela
         */


    // Deletar um dado da tabela 

    
    /*db.run(`DELETE FROM points WHERE cnpj = ?`, [22222222222222], function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("Registro deletado com sucesso");
    });*/
    

    
    
        /**
            Quando se usa a ? o proxímo parâmetro é sempre um array com os itens a serem substituidos
         */

    
});

module.exports = db; //Exporta o objeto db para ser utilizado por outros arquivos;