'use strict';

const db = require('../utils/db');

exports.cadastrarContribuicao = async (obj, schema) => {
	try {

		// Cadastrar pessoa
		let query =
			`
			INSERT INTO ${schema}.dizimistas
			(
				id_pessoa,
				id_tipo_contribuicao,
				id_forma_pagamento,
				valor,
				dia_vencimento,
				dt_inicio,
				ativo,
				dt_cadastro
			)
			VALUES
			(
				${obj.idPessoa},
				${obj.idTipoContribuicao},
				${obj.idFormaPagamento},
				${obj.valor},
				${obj.diaVencimento},
				'${obj.dtInicio}',
				true,
				'${await formatDate(new Date())}'
			)
			`;

		query = query.replace("'null'", "null")

		return await db.executar(query);

	} catch (e) {
		throw new Error(e);
	}
}

exports.cadastrarTentativaContribuicao = async (obj, schema) => {
	try {

		// Cadastrar pessoa
		let query =
			`
			INSERT INTO ${schema}.tentativa_contribuicao
			(
				id_pessoa,
				dt_cadastro
			)
			VALUES
			(
				${obj.idPessoa},
				'${await formatDate(new Date())}'
			)
			`;
		return await db.executar(query);
	} catch (e) {
		throw new Error(e);
	}
}

exports.buscarHistoricoDizimista = async (schema, idPessoa) => {
	try {

		const query =
			`
			SELECT *
			FROM 
			${schema}.historico_dizimista
			WHERE status = 'PAID'
			AND id_pessoa = ${idPessoa}
			ORDER BY dt_status DESC
			`;
		
		return await db.buscar(query);
		
	} catch (e) {
		throw new Error(e);
	}
}

exports.buscarGastos = async (schema) => {
	try {

		const query =
			`
			SELECT
			*
			FROM
			${schema}.utilizacao_dizimo
			ORDER BY dt_gasto DESC
			`;
		
		return await db.buscar(query);
		
	} catch (e) {
		throw new Error(e);
	}
}

exports.cadastrarHistoricoDizimista = async (obj, schema) => {
	try {


		// Cadastrar histórico
		let query =
			`
			UPDATE ${schema}.historico_dizimista
			SET atual = FALSE
			WHERE id_pessoa = ${obj.idPessoa}
				AND atual = TRUE
				AND order_id IN (null, '${obj.orderId}');


			INSERT INTO ${schema}.historico_dizimista
			(
				order_id, 
				id_pessoa, 
				atual, 
				status, 
				valor,
				dt_status
			)
			VALUES
			(
				'${obj.orderId}',
				${obj.idPessoa},
				${obj.atual},
				'${obj.status}',
				${obj.valor},
				'${obj.dtStatus}'
			)
			`;

		return await db.executar(query);

	} catch (e) {
		throw new Error(e);
	}
}

async function formatDate(date) {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }