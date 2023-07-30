import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import type { Contact } from '../src/contacts/contacts.types';

function createContact(): Omit<Contact, 'id'> {
	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		address: faker.location.streetAddress(),
		phone: faker.phone.number('09########'),
		favorite: faker.number.int({
			min: 0,
			max: 1,
		}),
	};
}

export async function seed(knex: Knex): Promise<void> {
	await knex('contacts').del();
	await knex.raw('ALTER TABLE contacts AUTO_INCREMENT = 1;');
	await knex('contacts').insert([...new Array<Contact>(10)].map(createContact));
}
