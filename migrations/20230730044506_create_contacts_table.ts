import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('contacts', function (table) {
		table.increments('id').primary();
		table.string('name', 255).notNullable();
		table.string('email', 255);
		table.string('address', 255);
		table.string('phone', 15).notNullable();
		table.tinyint('favorite', 1).defaultTo(0);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('contacts');
}
