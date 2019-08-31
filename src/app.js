const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

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


const app = express();

const User = require('./models/User');
const Folder = require('./models/Folder');
const UserGH = require('./models/UserGH');

const index = require('./routes/index');
const userRoute = require('./routes/user');
const folderRoute = require('./routes/folder');
const userGHRoute = require('./routes/userGH');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', index);
app.use('/users',userRoute);
app.use('/folders',folderRoute);
app.use('/userGHs',userGHRoute);

module.exports = app;