'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/dizimo.controller');

router.post('/nova-contribuicao/:idPessoa', controller.cadastrarContribuicao)

router.post('/nova-tentativa-contribuicao/:idPessoa', controller.cadastrarTentativaContribuicao)

router.get('/busca-dashboard/:idPessoa', controller.buscarDadosDashboard)

router.post('/pagseguro/novo-status-pagamento', controller.cadastrarHistoricoDizimista)

module.exports = router;