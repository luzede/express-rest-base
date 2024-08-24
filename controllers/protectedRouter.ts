import { Router } from "express";
// Middleware
import {
	authentication_jose,
	authentication_jsonwebtoken,
} from "../middleware/authentication";

// ### Protected Router ###
const protectedRouter = Router();

// Apply middleware to the protectedRouter
protectedRouter.use(authentication_jose, authentication_jsonwebtoken);

// Log the data passed from the middleware to the res.locals object
// and send "Hello World" message to the client
protectedRouter.get("/", (_req, res) => {
	// Get query parameters
	console.log(res.locals.username_one as string);
	console.log(res.locals.username_two as string);
	res.status(200).json({ message: "Hello World" });
});

export default protectedRouter;
