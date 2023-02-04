'use strict';

const db = require('../utils/db');

exports.cadastrarGasto = async (obj, schema) => {
	try {

		// Cadastrar novo gasto
		let query =
			`
			INSERT INTO ${schema}.utilizacao_dizimo
			(
				motivo,
				valor,
				dt_gasto
			)
			VALUES
			(
				'${obj.motivo}',
				${obj.valor},
				'${obj.dtGasto}'
			)
			`;

		const output = await db.executar(query);
		return output[0]
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