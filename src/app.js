const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

//funções de conectar e desconectar ao banco de dados

function connect() {
    mongoose.connect(config.connectionString);
    mongoose.connection.on('connected', function () {
        console.log('=====Conexão estabelecida com sucesso=====');

    });
    mongoose.connection.on('error', function (err) {
        console.log('=====Ocorreu um erro: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('=====Conexão finalizada=====');
    });
}
connect();
const app = express();

//importação de models
const User = require('./models/User');
const Folder = require('./models/Folder');
const UserGH = require('./models/UserGH');

//importação de routes
const index = require('./routes/index');
const userRoute = require('./routes/user');
const folderRoute = require('./routes/folder');
const userGHRoute = require('./routes/userGH');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/users', userRoute);
app.use('/folders', folderRoute);
app.use('/userGHs', userGHRoute);

//uso de cors para definir/habilitar os acessos externos
app.use(cors());

module.exports = app;