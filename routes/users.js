const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const auth = require('../middleware/auth')

const createUserToken = (userEmail) =>{
    return jwt.sign({email: userEmail}, config.secret_key, {expiresIn: config.token_time});
}

router.get('/', auth, async (req, res) => {
    try{
        const user = await Users.findOne({email: res.locals.auth_data.email});
        return res.send(user);

    }catch (err){
        return res.status(500).send({error: 'Usuário não encontrado!'});
    }
    
});

router.post('/create', async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send({error: 'Dados incompletos!'});

    try{
        if(await Users.findOne({email})) return res.status(400).send({error: 'Usuário já existente!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({user, token: createUserToken(user.id)});

    }catch (err){
        return res.status(500).send({error: 'Erro ao realizar a buscar usuário!'});
    }
})
router.post('/auth', async (req,res) =>{
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send({error: 'Dados incompletos!'});

    try{
        const user = await Users.findOne({email}).select('+password');
        if(!user) return res.status(400).send({error: 'Usuário não encontrado!'})

        const passOK = await bcrypt.compare(password, user.password);
        if(!passOK) return res.status(401).send({error: 'Senha incorretas!'});

        user.password = undefined;
        return res.send({user, token: createUserToken(user.email)});

    }catch (err){
        return res.status(500).send({error: 'Erro ao realizar a buscar usuário!'});
    }
})

module.exports = router;