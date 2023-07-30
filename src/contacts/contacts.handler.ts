import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import makeContactsService from './contacts.service';
import { ContactSchema, ContactFilter } from './contacts.types';

export async function createContact(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const newContactSchema = ContactSchema.omit({ id: true });

	try {
		const contactPayload = newContactSchema.parse(req.body);
		const contactsService = makeContactsService();
		const contact = await contactsService.createContact(contactPayload);
		return res.json(contact);
	} catch (error) {
		console.log(error);
		if (error instanceof z.ZodError) {
			return next(createError.BadRequest('Name and phone can not be empty'));
		}
		return next(
			createError.InternalServerError(
				'An error occurred while creating contact'
			)
		);
	}
}

type FilterQueryParams = {
	name: string | undefined;
	favorite: string | undefined;
};

function parseFilterQuery(filter: FilterQueryParams): ContactFilter {
	const { name } = filter;

	let favorite: boolean | undefined = undefined;
	if (filter.favorite === 'false' || filter.favorite === '0') {
		favorite = false;
	} else if (filter.favorite !== undefined) {
		favorite = true;
	}

	return { name, favorite };
}

export async function getContactsByFilter(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const contactsService = makeContactsService();
		const filter = parseFilterQuery(req.query as FilterQueryParams);
		const contacts = await contactsService.getManyContacts(filter);
		return res.json(contacts);
	} catch (error) {
		console.error(error);
		return next(
			createError.InternalServerError(
				'An error occurred while retrieving contacts'
			)
		);
	}
}

export async function getContact(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const contactsService = makeContactsService();
		const id = parseInt(req.params.id);
		if (!isNaN(id)) {
			const contact = await contactsService.getContactById(id);
			if (contact) {
				return res.json(contact);
			}
		}
	} catch (error) {
		console.log(error);
		return next(
			createError.InternalServerError(
				`An error occurred while retrieving contact with id=${req.params.id}`
			)
		);
	}

	return next(createError.NotFound('Contact not found'));
}

export async function updateContact(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (Object.keys(req.body).length === 0) {
		return next(createError.BadRequest('Data to update can not be empty'));
	}

	try {
		const contactsService = makeContactsService();
		const contactId = parseInt(req.params.id);
		if (!isNaN(contactId)) {
			const updated = await contactsService.updateContact(contactId, req.body);
			if (updated) {
				return res.json({
					message: 'Contact was updated successfully',
				});
			}
		}
	} catch (error) {
		console.log(error);
		return next(
			createError.InternalServerError(
				'An error occurred while updating contact with id=${req.params.id}'
			)
		);
	}

	return next(createError.NotFound('Contact not found'));
}

export async function deleteContact(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const contactsService = makeContactsService();
		const contactId = parseInt(req.params.id);
		if (!isNaN(contactId)) {
			const deleted = await contactsService.deleteContact(contactId);
			if (deleted) {
				return res.send({ message: 'Contact was deleted successfully' });
			}
		}
	} catch (error) {
		console.log(error);
		return next(
			createError.InternalServerError(
				`Could not delete contact with id=${req.params.id}`
			)
		);
	}

	return next(createError.NotFound('Contact not found'));
}

export async function deleteAllContacts(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const contactsService = makeContactsService();
		await contactsService.deleteAllContacts();
		return res.send({
			message: `Contacts were deleted successfully`,
		});
	} catch (error) {
		console.log(error);
		return next(
			createError.InternalServerError(
				'An error occurred while removing all contacts'
			)
		);
	}
}
