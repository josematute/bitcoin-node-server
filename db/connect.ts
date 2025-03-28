import { createClient } from "@supabase/supabase-js"

export const connectToDatabase = () => {
	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
		throw new Error("Missing Supabase environment variables")
	}

	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
	return supabase
}

