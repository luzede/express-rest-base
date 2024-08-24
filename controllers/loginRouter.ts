import express from "express";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { loginSchema } from "../schemas/loginSchema";
import config from "../utils/config";

const loginRouter = express.Router();

loginRouter.post("/jose/login", async (req, res) => {
	// Parse the request body to get the username and password
	const body = loginSchema.parse(req.body);

	/* Check if the username and password are correct
	...
	*/

	// Used for encoding strings to Uint8Array
	const encoder = new TextEncoder();

	// Create a new JSON Web Token
	const token = await new jose.SignJWT({
		username: body.username,
	})
		.setProtectedHeader({ alg: "HS256" }) // It is mandatory to set the algorithm
		.setSubject(body.username)
		.setExpirationTime(config.JWT_EXPIRE_IN)
		.sign(encoder.encode(config.JSON_SECRET));

	res.json({ token: token });
});

loginRouter.post("/jsonwebtoken/login", async (req, res) => {
	const body = loginSchema.parse(req.body);
	// To make it asynchronous, we have to give it a callback function
	// But we will have to handle the logic inside the callback function.
	// It does not return a promise of the token.
	const token = jwt.sign({ username: body.username }, config.JSON_SECRET, {
		expiresIn: config.JWT_EXPIRE_IN,
		subject: body.username,
		algorithm: "HS256", // Optional, default is HS256
	});

	res.json({ token: token });
});

export default loginRouter;
