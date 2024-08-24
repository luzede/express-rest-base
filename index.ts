import express from "express";
import cors from "cors";

import "express-async-errors"; // Import this before other routes

import loginRouter from "./controllers/loginRouter";
import protectedRouter from "./controllers/protectedRouter";

import errorHandler from "./middleware/errorHandler";

import config from "./utils/config";

const app = express();

// Cross Origin Resource Sharing
app.use(
	cors({
		origin: "*", // Allow all origins
	}),
);

/*  The json-parser takes the JSON data of a request, transforms it into
a JavaScript object and then attaches it to the body property of the request
object before the route handler is called. */
app.use(express.json());

app.use("/", loginRouter);
app.use("/protected", protectedRouter);

app.get("/", async (_req, res) => {
	res.send("Hello World");
});

app.use(errorHandler);

app.listen(config.APP_PORT, () => {
	console.log("Server is running on port 3000");
});
