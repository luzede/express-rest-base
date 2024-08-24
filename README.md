# ExpressJS REST API Base in TypeScript
Suitable to start any project and avoid configuring TS, middleware, authentication from ground up

## Installing
First `git clone` the repo and `cd` into it. Then run
```bash
npm install
```
You don't need to create `.env` file but if you want custom values, fill in the following fields:
```bash
# APP
APP_PORT=3000 # Default is 3000

# JWT
JWT_SECRET=YOUR_SECRET # Default is "secret", https://dev.to/7ji9xmel/generating-secrets-for-applications-4iml
JWT_EXPIRE_IN=1d # Default is "1m", example values: 10s, 1m, 2d
```

## Run in `dev` mode
```bash
npm run dev
```

## Build and run in `production` mode
```bash
npm run build
npm run start
```
