const express = require('express');
const connect = require('../Database');
const bcrypt = require('bcryptjs');
const router = express.Router();
let id = require('uniqid');

router.post('/register', async (req, res) => {
    const { name, email, cnpj, cnae, password, state, company } = req.body;
    let hash = await bcrypt.hash(password, 10);

    // password = hash;
    let this_id = id();
    if (name === '' || email === '' || cnpj === '' || password === '' || state === '' || company === '') {
        return res.status(400).json({ error: 'Preencha os campos para cadastrar!' })
    }
    connect.query('insert into accounts values (?,?,?);', [this_id, email, hash], (err, results) => {
        if (!err) {
            connect.query('insert into users values (?,?,?,?,?,?,?)', [this_id, name, email, cnae, cnpj, company, state], (erro, rows) => {
                if (!err) {
                    res.json({ success: 'Usuario cadastrado com sucesso!' })
                }
            })
        } else {
            res.status(400).json({ err })
        }
    })

    // connect.query('select * from accounts;', (err, rows) => {
    //     res.send(rows);
    // })

})

router.get('/', (req, res) => {
    connect.query('select * from users join accounts on accounts.user_id = users.user_id ;', (err, rows) => {
        if (!err) {
            return res.send(rows);
        }
        return res.status(400).json({ err })
    })
})

module.exports = app => app.use('/user', router);