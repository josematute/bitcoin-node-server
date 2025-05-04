import dotenv from "dotenv";
import express, { json, urlencoded, ErrorRequestHandler } from "express";
import { connectToDatabase } from "../db/connect";
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJson from "./tsoa/tsoa.json";
import { RegisterRoutes } from "./routes/routes";
import { errorHandlerMiddleware } from "./middleware/error-handler";

dotenv.config();

const prisma = connectToDatabase();
const app = express();

// middleware for json parsing of request body
app.use(urlencoded({ extended: true }));
app.use(json());

// serve Swagger UI
app.use(
	["/openapi", "/docs", "/swagger"],
	swaggerUI.serve,
	swaggerUI.setup(swaggerJson)
);

// serve swagger JSON
app.get("/swagger.json", (_, res) => {
	res.setHeader("Content-Type", "application/json");
	res.sendFile(__dirname + "/tsoa/tsoa.json");
});

// tsoa routes
RegisterRoutes(app);

// error handler
app.use(errorHandlerMiddleware as ErrorRequestHandler);

const port = process.env.PORT || 8080;

const start = async () => {
	try {
		console.log("🔄 Connecting to Postgres (via Prisma)...");
		await prisma.$connect();
		console.log("✅ Connected to Postgres!");
		console.log("🚀 Starting server...");

		app.listen(port, "0.0.0.0", () => {
			console.log(`✨ Server is running on port ${port}...`);
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.error("❌ Error during startup:", e.message);
		} else {
			console.error("❌ Error during startup:", e);
		}
		process.exit(1);
	}
};

start();

export default app;
