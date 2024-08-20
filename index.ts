import express from "express";
import "express-async-errors"; // Import this before other routes
// Routes
import loginRouter from "./controllers/loginRouter";
import protectedRouter from "./controllers/protectedRouter";
// Middleware
import errorHandler from "./middleware/errorHandler";

const app = express();
/*  The json-parser takes the JSON data of a request, transforms it into
a JavaScript object and then attaches it to the body property of the request
object before the route handler is called. */
app.use(express.json());

app.use("/", loginRouter);
app.use("/protected", protectedRouter);

app.get("/", (_req, res) => {
	res.send("Hello World");
});

app.use(errorHandler);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
