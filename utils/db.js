import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const dbUrl = process.env.DRIZZLE_DB_URL;

if (!dbUrl) {
    console.error("❌ DRIZZLE_DB_URL is not set! Check Vercel environment variables.");
    throw new Error("Database URL is missing. Set DRIZZLE_DB_URL in environment variables.");
}

console.log("✅ DB URL loaded, prefix:", dbUrl.substring(0, 30) + "...");

const sql = neon(dbUrl);
export const db = drizzle(sql, { schema });

