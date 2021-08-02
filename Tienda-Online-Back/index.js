'use strict'

var swaggerUi = require('swagger-ui-express');
var swaggerFile = require('./swagger.json');
var mongoose = require('mongoose');
var app = require('./app');
var port = 3200;

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/Tienda-Online',{useNewUrlParser: true, useUnifiedTopology:
true})
    .then(()=>{
        console.log('Conectado al Base De Datos');
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
        app.listen(port, ()=>{
            console.log('Servidor de Express Corriendo Exitosamente');
        })
    })
    .catch((err)=>{
        console.log('error al conectarse a la base de Datos',err);
    })