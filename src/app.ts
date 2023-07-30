import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import {
	methodNotAllowed,
	resourceNotFound,
	handleError,
} from './middlewares/error-handler';
import logger from './middlewares/logger';
import contactsRouter from './contacts/contacts.router';

const app: Express = express();
app.use(logger);
app.use(cors());
app.use(express.json());

app
	.route('/')
	.get((req: Request, res: Response) => {
		res.json({ message: 'OK' });
	})
	.all(methodNotAllowed);

app.use('/api/contacts', contactsRouter);

app.use(resourceNotFound);
app.use(handleError);

export default app;
