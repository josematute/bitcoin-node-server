import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "../db/connect";

dotenv.config();

const prisma = connectToDatabase();
const app = express();
const port = process.env.PORT || 8080;

const start = async () => {
	try {
		console.log("🔄 Connecting to Postgres (via Prisma)...");
		await prisma.$connect();
		console.log("✅ Connected to Postgres!");
		console.log("🚀 Starting server...");

		app.listen(port, () => {
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
