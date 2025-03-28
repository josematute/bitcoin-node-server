require("dotenv").config()
const connectToDatabase = require("./db/connect")

// Initialize Supabase client
const supabase = connectToDatabase()

console.log(supabase)

// Now you can use supabase client in your app
// Example:
// const { data, error } = await supabase
//   .from('your_table')
//   .select()
