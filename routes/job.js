// importando o express 
const express = require('express');

//importando a funcao do express que ira cuidar das rotas 
const router  = express.Router();

// importando o modelo de trabalho
const Job     = require('../models/Job')


//rota de teste 
router.get('/teste', (req, res) =>{
    res.send('deu certo ')
});



//adcionando o Job via post 
router.post('/add', (req, res) =>{
    //usando o detructuring para criar varias variaveis em uma só / todas essa variaveis estao vindo da quisicao body
    let {title, salary, company, description, email, new_job } = req.body;

    //inserindo dados no sistema
    Job.create({
        // por padrao ele essta esperando todos os parametros que indicamos na let destructuring
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    // este create retorna uma promisse e depois indicaremos que quando ele retornar iremos redirecionar a home 
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router