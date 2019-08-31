'use strict';

const express = require('express');
const router = express.Router();

//a rota abaixo serve para confirmar o funcionamento da api

router.get('/', (req, res, next) => {
    res.status(200).send({ title: 'Node ok' })
});

module.exports = router;