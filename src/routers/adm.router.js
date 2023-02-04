'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/adm.controller');

router.post('/novo-gasto', controller.cadastrarGasto)


module.exports = router;