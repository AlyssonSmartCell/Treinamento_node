const express    = require('express');
const exphbs     = require('express-handlebars'); //requisitando o handlebars
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser'); //requisitando o body-parser
const Job        = require('./models/Job')
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

// requisitando o handle-bars
app.set('views', path.join(__dirname, 'views')); // definicao do diretorio das views 
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');


//pasta padrao dos arquivos staticos 
app.use(express.static(path.join(__dirname, 'public'))); // mostramos ao express qual e a pasta padrao do css


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

    let search = req.query.job;
    let query = '%'+search+'%';

    if(!search){
        Job.findAll({order:[
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs
            });
        })
        .catch(err => console.log(err));

    }else{
        Job.findAll({
            where: {title: {[Op.like]:query}},
            order:[
                ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs, search
            });
        });
    }
    
    
});
//rota de busca do add


// routes jobs 


app.use('/jobs', require('./routes/job'));

