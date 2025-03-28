import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "../db/connect";

dotenv.config();

const supabase = connectToDatabase()

const app = express()
const port = process.env.PORT || 8080

const start = async () => {
	try {
		console.log("🔄 Connecting to Supabase...")

		if (!supabase) {
			throw new Error("Failed to initialize Supabase client")
		}

		console.log("✅ Successfully connected to Supabase!")
		console.log("🚀 Starting server...")

		app.listen(port, () => {
			console.log(`✨ Server is running on port ${port}`)
		})
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.error("❌ Error during startup:", e.message)
		} else {
			console.error("❌ Error during startup:", e)
		}
		process.exit(1)
	}
}

start()
