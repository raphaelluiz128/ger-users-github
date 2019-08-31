'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/folder');
const auth = require('../services/auth');

router.post('/', auth.isCommon, controller.post);
router.get('/', auth.isCommon, controller.get);
router.put('/', auth.isCommon, controller.put);
router.delete('/', auth.isCommon, controller.delete);
router.put('/addUser', auth.isCommon, controller.putAddUser);


module.exports = router;