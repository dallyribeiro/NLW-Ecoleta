const express = require("express")
const server = express() //Recebe a função

//Pegar o banco de dados
const db = require("./database/db")


//Configurar pasta publica
server.use(express.static("public"))

//Habilita o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extend: true}))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    //noCache salva algumas coisas na memoria para devolver mais rápido
    noCache: true
})

//Configurar caminhos da minha aplicação
//Página inicial
//req: Requisição
//res: Resposta
//server.get("/", (req, res) => {
//    res.sendFile(__dirname + "/views/index.html")
//} )

//Criar rotas para as páginas
//Chamar as rotas
//server.get("/create-point", (req, res) => {
//    res.rendersendFile(__dirname + "/views/create-point.html")
//})
// o barra / via get vai responder uma função
server.get("/", (req, res) => {
   return res.render("index.html", {title: "Um título"} )
} )

//req.querry: Querry String da nossa url
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body é o corpo do formulário
    //inserir dados no banco de dados
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    
    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado Com Sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }


    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    //3 Consultar os dados na tabela
    //Porcentagem (%) antes e depois para buscar coisas parececidas
    //db.all(`SELECT * FROM places`, function(err, rows) {
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        //console.log("Aqui estão seus registros: ")
        //console.log(rows)
        const total = rows.length
        //Mostrar a página html que mostra os dados
        return res.render("search-results.html", { places:rows, total: total})
    })

    
})

//Ligar o servidor
server.listen(3000)