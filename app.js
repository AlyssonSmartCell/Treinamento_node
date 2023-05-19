const express    = require('express');
const app        = express();
const db         = require('./db/connection');

//requisitando o body-parser
const bodyParser = require('body-parser');


const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O Express esta rodando na porta ${PORT}`);

} );

// indicando que estamos utilizando o body-parser 
app.use(bodyParser.urlencoded({extended: false}));


// db connection
db
    .authenticate()
    .then(() =>{
        console.log("conectado ao banco de dados com sucesso");
    })
    .catch(err =>{
        console.log("Ocorreu um erro ao conectar.", err);
    });

//routes
app.get('/', (req, res) =>{
    res.send("Esta funcionando 4")
});

// routes jobs 
app.use('/jobs', require('./routes/job'));

