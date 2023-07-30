import type { Knex } from 'knex';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const knexConfig: Knex.Config = {
	client: 'mysql',
	connection: {
		host: DB_HOST,
		port: Number(DB_PORT),
		user: DB_USER,
		password: DB_PASS,
		database: DB_NAME,
	},
	pool: { min: 0, max: 10 },
};

export default knexConfig;
