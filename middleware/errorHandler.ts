import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { errors } from "jose";
import { JsonWebTokenError } from "jsonwebtoken";

export default function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void {
	// When zodSchema.parse() validation fails, it throws a ZodError
	if (err instanceof ZodError) {
		res.status(400).json({
			name: err.name,
			message: "Validation failed",
			issues: err.issues,
		});
	}
	// When JSON.parse() fails, it throws a SyntaxError
	else if (err instanceof SyntaxError) {
		res.status(400).json({
			name: err.name,
			message: "Invalid JSON body",
		});
	}
	// If you use "jose" for jwt authentication
	else if (err instanceof errors.JOSEError) {
		res.status(401).json({
			name: "Unauthorized",
			message: "Invalid or missing token",
		});
	}
	// If you use "jsonwebtoken" for jwt authentication
	else if (err instanceof JsonWebTokenError) {
		res.status(401).json({
			name: "Unauthorized",
			message: "Invalid or missing token",
		});
	} else {
		console.error(err.name, err.message, err.stack);
		throw err;
	}
}
