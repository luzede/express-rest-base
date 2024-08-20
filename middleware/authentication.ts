import jwt from "jsonwebtoken";
import * as jose from "jose";

import type { Request, Response, NextFunction } from "express";

import config from "../utils/config";

// "jose" is preferred since it works better with TypeScript typing
// and has zero dependencies, can be used on other runtimes like CF Workers
export async function authentication_jose(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = getToken(req);
	const encoder = new TextEncoder();
	const { payload } = await jose.jwtVerify<{ sub: string; username: string }>(
		token,
		encoder.encode(config.JSON_SECRET),
	);

	res.locals.username_one = payload.username;
	next();
}

export function authentication_jsonwebtoken(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = getToken(req);

	const payload = jwt.verify(token, config.JSON_SECRET) as {
		username: string;
		sub: string;
	};

	res.locals.username_two = payload.username;
	next();
}

// ### Helper Functions ###
function getToken(req: Request): string {
	const authorization = req.get("authorization");
	if (!authorization || !authorization.startsWith("Bearer ")) {
		return "";
	}

	return authorization.replace("Bearer ", "");
}
