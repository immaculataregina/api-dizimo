'use strict'

require('dotenv').config();
// const Error = require('../utils/errors');

const AdmModel = require('../models/adm.model');
const axios = require('axios');

exports.cadastrarGasto = async (req, res) => {
    const schema = req.headers.schema;

    // Dados
    const motivo = req.body.motivo
    const valor = req.body.valor
    const dtGasto = req.body.dtGasto

    try {

       // Insere a contribuição
        const objInsert = {
            motivo,
            valor,
            dtGasto
        }

        const output = await AdmModel.cadastrarGasto(
            objInsert,
            schema
        )

        res.status(200).json({ message: 'Cadastro realizado com sucesso!', 
            result: true, 
            output 
        })

    } catch (error) {
        res.status(500).json({ error })
    }

}