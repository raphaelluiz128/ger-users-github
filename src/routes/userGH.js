'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/userGH');
const auth = require('../services/auth');

router.post('/getGH', auth.isAdmin, controller.getGH);
router.get('/', auth.isCommon, controller.get);
router.post('/getByTags', auth.isCommon, controller.getByTags);
router.put('/', auth.isCommon, controller.putTags);


module.exports = router;