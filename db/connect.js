const { createClient } = require("@supabase/supabase-js")

const connectToDatabase = () => {
	// Create Supabase client
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

	return supabase
}

module.exports = connectToDatabase
