# Notes

## Give option arguments to scripts in the `package.json`
To be able to give option arguments to scripts in the `package.json`, you have to prefix it with `--`.
For example:
```bash
npm run ts-node index.ts -- --option-without-argument --option-with-argument option-argument
```
Why do we need `--`?: 
That's a delimiter so everything after -- is treated as an argument to a script itself and is not parsed by npm.

## Generating `tsconfig.json`
After installing typescript, you generally run the `tsc --init` command for more clarity, the following is recommended:
```json
{
    // ..
    "scripts": {
        "tsc": "tsc"
    },
    // .. 
}
```
```bash
npm run tsc -- --init
```

## Adding routes and middleware
It is done by using `.use()` method.
```ts
app.use("/base_path/", router);
```

## Passing data from middleware to the next handler
You add data to the `response.locals` object.
```ts
function middleware(req, res, next) {
	//...
	res.locals.some_name = whatever_data;
	next();
}
```
Unfortunately I could not find an easy way to add types to locals, the best thing I could do was declare it as some type.
```ts
app.get("/", (req, res) => {
	// ...
	const some_data = res.locals.some_name as { whatever: string, random_number: number }
	// ...
})
```

## Error handling in Express using TypeScript
The TS linter will throw red errors if you do not define the types of parameters in the error handler function, and the types should be imported from express. An example:
```ts
app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		console.error(err.name, err.message, err.stack);
		res.status(500).send("Something broke!");
	},
);
```

If you are going to use `express-async-errors` to avoid writing `try {} catch {}` statements in your routes, you have to import it before any of the routes like this: `import "express-async-errors"`
For more detailed information: https://fullstackopen.com/en/part4/testing_the_backend#eliminating-the-try-catch

## Status code for different types of response
| Type | Status code |
| -------- | ------- |
| Input validation failure |  400 Bad Request  |
| Already exists or double submit | 409 Conflic  |
| Unauthorized | 401 Unauthorized |
