import { Router } from "express";
// Middleware
import {
	authentication_jose,
	authentication_jsonwebtoken,
} from "../middleware/authentication";

// ### Protected Router ###
const protectedRouter = Router();
protectedRouter.use(authentication_jose, authentication_jsonwebtoken);

protectedRouter.get("/", (_req, res) => {
	// Get query parameters
	console.log(res.locals.username_one as string);
	console.log(res.locals.username_two as string);
	res.status(200).json({ message: "Hello World" });
});
export default protectedRouter;
