require("dotenv").config()
const connectToDatabase = require("./db/connect")

// Initialize Supabase client
const supabase = connectToDatabase()

const express = require("express")
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
	} catch (e) {
		console.error("❌ Error during startup:", e.message)
		process.exit(1)
	}
}

start()
