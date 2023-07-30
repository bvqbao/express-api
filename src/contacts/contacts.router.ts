import express from 'express';
import { methodNotAllowed } from '../middlewares/error-handler';
import * as contactsHandler from './contacts.handler';

const router = express.Router();

router
	.route('/')
	.get(contactsHandler.getContactsByFilter)
	.post(contactsHandler.createContact)
	.delete(contactsHandler.deleteAllContacts)
	.all(methodNotAllowed);

router
	.route('/:id')
	.get(contactsHandler.getContact)
	.put(contactsHandler.updateContact)
	.delete(contactsHandler.deleteContact)
	.all(methodNotAllowed);

export default router;
