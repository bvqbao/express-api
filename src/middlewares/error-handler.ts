import { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';

export function methodNotAllowed(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.route) {
		const allowedMethods = Object.keys(req.route.methods)
			.filter((method) => method !== '_all')
			.map((method) => method.toUpperCase());
		return next(
			createError.MethodNotAllowed(`Allow ${allowedMethods.join(', ')}`)
		);
	}
	return next();
}

export function resourceNotFound(
	req: Request,
	res: Response,
	next: NextFunction
) {
	return next(createError.NotFound('Resource not found'));
}

export function handleError(
	error: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (res.headersSent) {
		return next(error);
	}

	const statusCode = error.status || error.statusCode || 500;

	return res
		.status(statusCode)
		.set(error.headers)
		.json({
			statusCode,
			message: error.message || 'Internal Server Error',
		});
}
