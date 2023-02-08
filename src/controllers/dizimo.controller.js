'use strict'

require('dotenv').config();
// const Error = require('../utils/errors');

const DizimoModel = require('../models/dizimo.model');
const axios = require('axios');

exports.cadastrarContribuicao = async (req, res) => {
    const schema = req.headers.schema;

    // Dados
    const idPessoa = req.params.idPessoa
    const idTipoContribuicao = req.body.idTipoContribuicao
    const idFormaPagamento = req.body.idFormaPagamento
    const valor = req.body.valor
    const diaVencimento = req.body.diaVencimento || null
    const dtInicio = req.body.dtInicio || null

    try {

       // Insere a contribuição
        const objInsert = {
            idPessoa,
            idTipoContribuicao,
            idFormaPagamento,
            valor,
            diaVencimento,
            dtInicio
        }

        await PessoasModel.cadastrarContribuicao(
            objInsert,
            schema
        )

        res.status(200).json({ message: 'Cadastro realizado com sucesso!' })

    } catch (error) {
        res.status(500).json({ error })
    }

}

exports.cadastrarTentativaContribuicao = async (req, res) => {
    const schema = req.headers.schema;

    // Dados
    const idPessoa = req.params.idPessoa

    try {

       // Insere a contribuição
        const objInsert = {
            idPessoa
        }

        await DizimoModel.cadastrarTentativaContribuicao(
            objInsert,
            schema
        )

        res.status(200).json({ message: 'Cadastro realizado com sucesso!' })

    } catch (error) {
        res.status(500).json({ error })
    }

}

exports.cadastrarHistoricoDizimista = async (req, res) => {
    const schema = req.headers.schema;

    // Dados
    const orderId = req.body.orderId;
    const idPessoa = req.body.idPessoa;
    const atual = true;
    const status = req.body.status;
    const valor = req.body.valor;
    const dtStatus = req.body.dtStatus;

    try {

       // Insere a contribuição
        const objInsert = {
            orderId,
            idPessoa,
            atual,
            status,
            valor,
            dtStatus
        }

        await DizimoModel.cadastrarHistoricoDizimista(
            objInsert,
            schema
        )

        res.status(200).json({ message: 'Status de pagamento atualizado!' })

    } catch (error) {
        res.status(500).json({ error })
    }

}

exports.buscarDadosDashboard = async (req, res) => {

    const schema = req.headers.schema;
    const dizimista = req.headers.dizimista;
    let idPessoa = req.params.idPessoa;

    try {
        let gastos = await DizimoModel.buscarGastos(
            schema
        );
        let historicoDizimista = null;
        if (dizimista){
            historicoDizimista = await DizimoModel.buscarHistoricoDizimista(
                schema,
                idPessoa
            )
        } 

        return res.status(200).json({ gastos, historicoDizimista })

    } catch (error) {

        return res.status(500).json({ message: error })

    }
    
}