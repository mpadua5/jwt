const path = require('path');
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT;
const app = express();

let swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: [
        path.join(__dirname,'routes.js')
    ]
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/', routes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

app.listen(port);

console.log(" ╭━━━━╮  ╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮");
console.log(" ┃╭╮╭╮┃  ┃ I do listen something in port " + port + "  ┃");
console.log("┗┫┏━━┓┣┛ ╰┳╮ This is VERY GOOD !!              ┃");
console.log(" ┃╰━━╯┃━━━╯╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯ ");
console.log(" ╰┳━━┳╯");
