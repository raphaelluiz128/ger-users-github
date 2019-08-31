'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');


router.post('/', controller.post);
router.post('/auth', controller.authenticate);
router.get('/', controller.get);
router.get('/id/:id', controller.getById);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;