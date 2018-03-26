//Se importa el modulo express
//Express recibe y procesa las peticiones HTTP
const express = require("express");
//Se crea la aplicacion express
const app = express();
//Se crea un puerto que será dado por heroku o se declarará en un archivo aparte
const PORT= process.enn.PORT || 3000;
app.get("/",(request, response) => {
    response.send({ hi: 'There'});
});

app.listen(PORT);