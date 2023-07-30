import dotenv from 'dotenv';
import type { Knex } from 'knex';

// Typescript compiler does not hoist imports
dotenv.config();

import knexConfig from './src/database/knex-config';

const config: Knex.Config = {
	...knexConfig,
	migrations: {
		extension: 'ts',
		directory: './migrations',
	},
	seeds: {
		extension: 'ts',
		directory: './seeds',
	},
};

export default config;
