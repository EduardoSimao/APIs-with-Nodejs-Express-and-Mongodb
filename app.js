const express =  require('express');
const app = express();
const http = require("http");

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config')

const url = config.url_db;

const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true
}

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Não foi possivel realizar a conexão com o banco de dados' + err);
});

mongoose.connection.on('disconnected', () =>{
    console.log('A aplicação foi desconectada do banco de dados!');
});

mongoose.connection.on('connected', () =>{
    console.log('Aplicação conectada com o banco de dados!');
});


app.use(bodyParser.urlencoded({ extended: false  }));
app.use(bodyParser.json());


app.use('/', indexRoutes);
app.use('/users', usersRoutes);


http.createServer(app).listen(3000);

module.exports = app;
