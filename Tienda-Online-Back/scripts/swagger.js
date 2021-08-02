const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Ventas KINAL',
        description: 'Un API para ventas de productos',
    },
    host: 'localhost:3200',
    scheme: ['http'],
}

const outputFile = path.resolve('swagger.json');
const endpointsFiles = [path.resolve('routes', '**', '*'), path.resolve('app.js')]

swaggerAutogen(outputFile, endpointsFiles, doc);