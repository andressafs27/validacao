import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta) {
    const dados = requisicao.body;
    let conteudoResposta = '';

    if(!(dados.nome && dados.sobrenome && dados.email && dados.senha && dados.endereco)){
        conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Formulário</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <style>
                body {
                    background-color: #6bdb74;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 25px;
                    background-color: #fff;
                    border: 1px solid purple;
                    border-radius: 5px;
                    margin-top: 50px;
                }
        
                legend {
                    font-size: 24px;
                    text-align: center;
                    color: purple;
                }
        
                .form-control {
                    margin-bottom: 10px;
                }
        
                .btn-primary {
                    background-color: purple;
                    border-color: white;
                    color:white;
                    text-align: center;
                    float:right
                }
            </style>
        </head>
        <body>
            <div class="container">
                <fieldset>
                    <legend>
                        <h1>Cadastro de Usuário</h1>
                    </legend>
                    <form id="formulario" action="/cadastra" method="POST" class="needs-validation" novalidate>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="nome">Nome</label>
                                <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" value="${dados.nome}" required> 
                            </div>
        `;
        if(!dados.nome){
            conteudoResposta += `<div>
                                    <p style="color:red" >O campo nome é obrigatório, por favor insira o nome</p>
                                </div>`;
        }
        conteudoResposta += `
                            <div class="form-group col-md-6">
                                <label for="sobrenome">Sobrenome</label>
                                <input type="text" class="form-control" id="sobrenome" name="sobrenome" placeholder="Sobrenome" value="${dados.sobrenome}" required>
                            </div>
                        </div>
        `;
        if(!dados.sobrenome){
            conteudoResposta += `<div>
                                    <p style="color:red">O campo sobrenome é obrigatório, por favor insira o sobrenome</p>
                                </div>`;
        }
        conteudoResposta += `
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Email</label>
                                <input type="email" class="form-control" id="inputEmail4" name="email" placeholder="Email" value="${dados.email}" required>
                            </div>
        `;
        if(!dados.email){
            conteudoResposta += `<div>
                                    <p style="color:red">O campo e-mail é obrigatório, por favor insira o e-mail</p>
                                </div>`;
        }
        conteudoResposta += `
                            <div class="form-group col-md-6">
                                <label for="inputPassword4">Senha</label>
                                <input type="password" class="form-control" id="inputPassword4" name="senha" placeholder="Senha" value="${dados.senha}" required>
                            </div>
                        </div>
        `;
        if(!dados.senha){
            conteudoResposta += `<div>
                                    <p style="color:red">O campo senha é obrigatório, por favor insira o senha</p>
                                </div>`;
        }
        conteudoResposta += `
                        <div class="form-group">
                            <label for="inputAddress">Endereço</label>
                            <input type="text" class="form-control" id="inputAddress" name="endereco" placeholder="Rua dos Bobos, nº 0"  value="${dados.endereco}" required>
                        </div>  
        `;
        if(!dados.endereco){
            conteudoResposta += `<div>
                                    <p style="color:red">O campo endereço é obrigatório, por favor insira o endereço</p>
                                </div>`;
        }
        conteudoResposta += `
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </form>
                </fieldset>
            </div>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        </body>
        </html>
        `;
        resposta.end(conteudoResposta);
    }
    else{
        const usuario = {
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            email: dados.email,
            senha: dados.senha,
            endereco: dados.endereco
        }

        listaUsuarios.push(usuario);
        conteudoResposta = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <!-- Restante do cabeçalho -->
                    <style>
                        /* Estilos para a tabela de usuários cadastrados */
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 20px 0;
                        }

                        table, th, td {
                            border: 1px solid black;
                        }

                        th{
                            text-align:center;
                            padding: 10px;
                        }

                        td {
                            padding: 10px;
                            text-align: left;
                        }

                        thead {
                            background-color: #333;
                            color: #fff;
                        }

                        /* Estilos para os botões */
                        a {
                            display: inline-block;
                            padding: 10px 20px;
                            margin: 10px;
                            background-color: black;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: bold;
                            border:1px solid black;
                        }

                        a:hover {
                            background-color: white;
                            color:black;
                        }

                        h1{
                            font-size: 24px;
                            text-align: center;
                        }

                        body {
                            background-color: #6bdb74;
                        }
                    </style>
                
                </head>
                <body>
                    <h1>Usuários Cadastrados</h1>
                    <table>
                        <!-- Tabela de usuários cadastrados -->
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>E-mail</th>
                                <th>Endereço</th>
                            </tr>
                        </thead>
                        <tbody>`;

                        listaUsuarios.forEach((usuario) => {
                            conteudoResposta += `
                                <tr>
                                    <td>${usuario.nome}</td>
                                    <td>${usuario.sobrenome}</td>
                                    <td>${usuario.email}</td>
                                    <td>${usuario.endereco}</td>
                                </tr>`;
                        });
        
                        conteudoResposta += `

                    </table>
                        <a href="/" >Voltar ao Menu anterior</a>
                        <a href="/cadastra.html">Continuar Cadastrando</a>
                </body>
            </html>`;
        
        resposta.end(conteudoResposta);
    }
}

const app = express();
app.use(express.urlencoded({extend: true}));
app.use(express.static('./paginas'));
//app.use(express.static(path.join(process.cwd(),'./paginas')));



app.get('/', (requisicao, resposta) => {
    resposta.end(
        `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <title>Formulário</title>
                <meta name='viewport' content='width=device-width, initial-scale=1'>
                <script src='main.js'></script>
                <style>

                    body{
                        background-color: purple;
                    }

                    h1 {
                        color: white; 
                        font-size: 24px; 
                        text-align: center;
                    }

                    ul {
                        list-style-type: none; 
                    }

                    li {
                        margin-bottom: 10px; 
                    }

                    a{
                        text-decoration: none; 
                        color: black; 
                        font-weight: bold;
                        text-align:center;
                        border-radius: 5px;
                        border: 1px white; 
                        background-color: pink;
                        padding: 8px;
                    }

                </style>
                
            </head>
            <body>
                <h1>Menu</h1>
                <ul>
                    <li><a href="cadastra.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
        </html>
    `
    )
});


app.post('/cadastra.html', (requisicao, resposta) => {
    resposta.sendFile(__dirname + '/paginas/cadastra.html');
});


app.post('/cadastra', processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});
