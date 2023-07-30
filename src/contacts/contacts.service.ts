import type { Contact, ContactFilter } from './contacts.types';
import database from '../database';

function makeContactsService() {
	const contacts = database<Contact>('contacts');

	async function createContact(
		contact: Pick<Contact, 'name' | 'phone'> & Partial<Contact>
	): Promise<Pick<Contact, 'name' | 'phone'> & Partial<Contact>> {
		const [id] = await contacts.insert(contact);
		return { id, ...contact };
	}

	async function getManyContacts(filter: ContactFilter): Promise<Contact[]> {
		const { name, favorite } = filter;
		return contacts
			.where((builder) => {
				if (name) {
					builder.where('name', 'like', `%${name}%`);
				}
				if (favorite !== undefined) {
					builder.where('favorite', favorite);
				}
			})
			.select('*');
	}

	async function getContactById(id: number): Promise<Contact | undefined> {
		return contacts.where('id', id).select('*').first();
	}

	async function updateContact(
		id: number,
		contact: Omit<Contact, 'id'>
	): Promise<number> {
		return contacts.where('id', id).update(contact);
	}

	async function deleteContact(id: number): Promise<number> {
		return contacts.where('id', id).del();
	}

	async function deleteAllContacts(): Promise<number> {
		return contacts.del();
	}

	return {
		getManyContacts,
		deleteAllContacts,
		getContactById,
		createContact,
		updateContact,
		deleteContact,
	};
}

export default makeContactsService;
