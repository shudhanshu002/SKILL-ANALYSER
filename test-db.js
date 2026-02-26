const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);

async function testConnection() {
    console.log("Testing connection to:", process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
    try {
        const result = await sql`SELECT 1`;
        console.log("Connection successful:", result);
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

testConnection();
