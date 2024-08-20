import dotenv from "dotenv";

const config = dotenv.config();

if (config.error) {
	throw config.error;
}

export default {
	PORT: process.env.PORT || 3000,
	HOST: process.env.HOST || "localhost",
	JSON_SECRET: process.env.JSON_SECRET || "secret",
	JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || "1m",
};
